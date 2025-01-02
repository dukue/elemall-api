const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');
const Warehouse = require('./Warehouse');

const InventoryTransaction = sequelize.define('InventoryTransaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  },
  fromWarehouseId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Warehouse,
      key: 'id'
    }
  },
  toWarehouseId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Warehouse,
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  type: {
    type: DataTypes.ENUM('in', 'out', 'transfer'),
    allowNull: false,
    comment: '交易类型：入库/出库/调拨'
  },
  reason: {
    type: DataTypes.STRING(200),
    allowNull: true,
    comment: '原因说明'
  },
  operatorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
}, {
  createdAt: 'createTime',
  updatedAt: 'updateTime'
});

// 设置关联关系
InventoryTransaction.belongsTo(Product, { foreignKey: 'productId' });
InventoryTransaction.belongsTo(Warehouse, { as: 'fromWarehouse', foreignKey: 'fromWarehouseId' });
InventoryTransaction.belongsTo(Warehouse, { as: 'toWarehouse', foreignKey: 'toWarehouseId' });

module.exports = InventoryTransaction; 