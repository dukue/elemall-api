const { Op } = require('sequelize');
const Warehouse = require('../models/Warehouse');
const Inventory = require('../models/Inventory');
const InventoryTransaction = require('../models/InventoryTransaction');
const Product = require('../models/Product');
const sequelize = require('../config/database');

exports.getWarehouses = async (req, res) => {
  try {
    const { query = '' } = req.query;

    const whereClause = query
      ? {
          [Op.or]: [
            { code: { [Op.like]: `%${query.toUpperCase()}%` } },
            { name: { [Op.like]: `%${query}%` } },
            { location: { [Op.like]: `%${query}%` } }
          ]
        }
      : {};

    const warehouses = await Warehouse.findAll({
      where: whereClause,
      order: [['code', 'ASC']]
    });

    res.json({
      code: 200,
      message: '获取仓库列表成功',
      data: warehouses
    });
  } catch (error) {
    console.error('Get warehouses error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.createWarehouse = async (req, res) => {
  try {
    const { code, name, location, country, contact, phone } = req.body;

    // 检查仓库代码是否已存在
    const existingWarehouse = await Warehouse.findOne({
      where: { code }
    });

    if (existingWarehouse) {
      return res.status(400).json({
        code: 400,
        message: '仓库代码已存在'
      });
    }

    const warehouse = await Warehouse.create({
      code,
      name,
      location,
      country,
      contact,
      phone
    });

    res.status(201).json({
      code: 200,
      message: '仓库创建成功',
      data: warehouse
    });
  } catch (error) {
    console.error('Create warehouse error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.updateWarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, country, contact, phone, isActive } = req.body;

    const warehouse = await Warehouse.findByPk(id);
    if (!warehouse) {
      return res.status(404).json({
        code: 404,
        message: '仓库不存在'
      });
    }

    await warehouse.update({
      name,
      location,
      country,
      contact,
      phone,
      isActive
    });

    res.json({
      code: 200,
      message: '仓库更新成功',
      data: warehouse
    });
  } catch (error) {
    console.error('Update warehouse error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.deleteWarehouse = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;

    const warehouse = await Warehouse.findByPk(id);
    if (!warehouse) {
      return res.status(404).json({
        code: 404,
        message: '仓库不存在'
      });
    }

    // 检查是否有库存
    const hasInventory = await Inventory.count({
      where: { warehouseId: id, quantity: { [Op.gt]: 0 } }
    });

    if (hasInventory > 0) {
      return res.status(400).json({
        code: 400,
        message: '仓库中还有库存，无法删除'
      });
    }

    await warehouse.destroy({ transaction });
    await transaction.commit();

    res.json({
      code: 200,
      message: '仓库删除成功'
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Delete warehouse error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.getProductInventory = async (req, res) => {
  try {
    const { id } = req.params;

    const inventory = await Inventory.findAll({
      where: { productId: id },
      include: [{
        model: Warehouse,
        attributes: ['code', 'name', 'location', 'country']
      }],
      order: [[Warehouse, 'code', 'ASC']]
    });

    res.json({
      code: 200,
      message: '获取商品库存成功',
      data: inventory
    });
  } catch (error) {
    console.error('Get product inventory error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.transferInventory = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const { fromWarehouseId, toWarehouseId, quantity, reason } = req.body;

    // 检查商品是否存在
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        code: 404,
        message: '商品不存在'
      });
    }

    // 检查源仓库库存
    const sourceInventory = await Inventory.findOne({
      where: { productId: id, warehouseId: fromWarehouseId }
    });

    if (!sourceInventory || sourceInventory.quantity < quantity) {
      return res.status(400).json({
        code: 400,
        message: '源仓库库存不足'
      });
    }

    // 获取或创建目标仓库库存记录
    const [targetInventory] = await Inventory.findOrCreate({
      where: { productId: id, warehouseId: toWarehouseId },
      defaults: { quantity: 0, safetyStock: 10 }
    });

    // 更新库存
    await sourceInventory.decrement('quantity', { by: quantity, transaction });
    await targetInventory.increment('quantity', { by: quantity, transaction });

    // 记录库存调拨流水
    await InventoryTransaction.create({
      productId: id,
      fromWarehouseId,
      toWarehouseId,
      quantity: Number(quantity),
      type: 'transfer',
      reason: reason || '库存调拨',
      operatorId: req.user.id
    }, { transaction });

    await transaction.commit();

    res.json({
      code: 200,
      message: '库存调拨成功'
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Transfer inventory error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.setProductInventory = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const { inventory } = req.body;

    // 检查商品是否存在
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        code: 404,
        message: '商品不存在'
      });
    }

    // 批量创建或更新库存记录
    for (const item of inventory) {
      const { warehouseId, quantity, safetyStock = 10 } = item;

      // 检查仓库是否存在
      const warehouse = await Warehouse.findByPk(warehouseId);
      if (!warehouse) {
        throw new Error(`仓库ID ${warehouseId} 不存在`);
      }

      // 查找或创建库存记录
      const [inventoryRecord, created] = await Inventory.findOrCreate({
        where: { productId: id, warehouseId },
        defaults: { quantity: 0, safetyStock },
        transaction
      });

      // 如果是新记录或数量有变化，创建库存变动记录
      if (created || inventoryRecord.quantity !== quantity) {
        const changeQuantity = quantity - (created ? 0 : inventoryRecord.quantity);
        
        if (changeQuantity !== 0) {
          await InventoryTransaction.create({
            productId: id,
            toWarehouseId: changeQuantity > 0 ? warehouseId : null,
            fromWarehouseId: changeQuantity < 0 ? warehouseId : null,
            quantity: Math.abs(changeQuantity),
            type: changeQuantity > 0 ? 'in' : 'out',
            reason: created ? '初始库存' : '库存调整',
            operatorId: req.user.id
          }, { transaction });
        }
      }

      // 更新库存记录
      await inventoryRecord.update({
        quantity,
        safetyStock
      }, { transaction });
    }

    await transaction.commit();

    // 获取更新后的库存信息
    const updatedInventory = await Inventory.findAll({
      where: { productId: id },
      include: [Warehouse]
    });

    res.json({
      code: 200,
      message: '商品库存设置成功',
      data: updatedInventory
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Set product inventory error:', error);
    res.status(500).json({
      code: 500,
      message: error.message || '服务器错误'
    });
  }
}; 