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