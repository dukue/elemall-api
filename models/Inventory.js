const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');
const Warehouse = require('./Warehouse');

const Inventory = sequelize.define('Inventory', {
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
  warehouseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Warehouse,
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    },
    comment: '库存数量'
  },
  safetyStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    },
    comment: '安全库存'
  },
  reservedQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    },
    comment: '预留数量'
  }
}, {
  createdAt: 'createTime',
  updatedAt: 'updateTime',
  indexes: [
    {
      unique: true,
      fields: ['productId', 'warehouseId']
    }
  ]
});

// 设置关联关系
Inventory.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Inventory, { foreignKey: 'productId' });
Inventory.belongsTo(Warehouse, { foreignKey: 'warehouseId' });
Warehouse.hasMany(Inventory, { foreignKey: 'warehouseId' });

module.exports = Inventory; 