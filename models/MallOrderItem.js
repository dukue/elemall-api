const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const MallOrder = require('./MallOrder');
const Product = require('./Product');

const MallOrderItem = sequelize.define('mall_order_item', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'mall_orders',
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    }
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  productImage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  }
}, {
  timestamps: true,
  createdAt: 'createTime',
  updatedAt: 'updateTime',
  indexes: [
    {
      fields: ['orderId']
    },
    {
      fields: ['productId']
    }
  ]
});

// 建立关联关系
MallOrderItem.belongsTo(MallOrder, {
  foreignKey: 'orderId',
  as: 'order'
});

MallOrderItem.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product'
});

MallOrder.hasMany(MallOrderItem, {
  foreignKey: 'orderId',
  as: 'items'
});

module.exports = MallOrderItem; 