const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const MallUser = require('./MallUser');
const { ORDER_STATUS, PAYMENT_METHODS } = require('../utils/orderUtils');

const MallOrder = sequelize.define('mall_order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderNo: {
    type: DataTypes.STRING(32),
    allowNull: false,
    unique: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'mall_users',
      key: 'id'
    }
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid', 'shipped', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending'
  },
  payMethod: {
    type: DataTypes.ENUM('alipay', 'wechat', 'bank'),
    allowNull: true
  },
  payTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  shipTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  completeTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  receiverName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  receiverPhone: {
    type: DataTypes.STRING(11),
    allowNull: false
  },
  province: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  district: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  detailAddress: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  remark: {
    type: DataTypes.STRING(500),
    allowNull: true
  }
}, {
  timestamps: true,
  createdAt: 'createTime',
  updatedAt: 'updateTime',
  indexes: [
    {
      unique: true,
      fields: ['orderNo']
    },
    {
      fields: ['userId']
    },
    {
      fields: ['status']
    },
    {
      fields: ['createTime']
    }
  ]
});

// 建立与用户的关联关系
MallOrder.belongsTo(MallUser, {
  foreignKey: 'userId',
  as: 'user'
});

MallUser.hasMany(MallOrder, {
  foreignKey: 'userId',
  as: 'orders'
});

module.exports = MallOrder; 