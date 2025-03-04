const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const MallUser = require('./MallUser');
const Product = require('./Product');

const MallCartItem = sequelize.define('mall_cart_item', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'mall_users',
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
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  selected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  timestamps: true,
  createdAt: 'createTime',
  updatedAt: 'updateTime',
  indexes: [
    {
      fields: ['userId']
    },
    {
      fields: ['productId']
    },
    {
      unique: true,
      fields: ['userId', 'productId']
    }
  ]
});

// 建立关联关系
MallCartItem.belongsTo(MallUser, {
  foreignKey: 'userId',
  as: 'user'
});

MallCartItem.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product'
});

MallUser.hasMany(MallCartItem, {
  foreignKey: 'userId',
  as: 'cartItems'
});

module.exports = MallCartItem; 