const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./Order');

const CustomsClearance = sequelize.define('CustomsClearance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM(
      'pending',      // 待清关
      'submitted',    // 已提交
      'inspecting',   // 查验中
      'approved',     // 已放行
      'rejected',     // 已拒绝
      'completed'     // 已完成
    ),
    allowNull: false,
    defaultValue: 'pending',
    comment: '清关状态'
  },
  declarationNo: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: '报关单号'
  },
  customsOffice: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: '海关关区'
  },
  inspectionNotes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '查验备注'
  },
  operatorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    },
    comment: '操作人ID'
  }
}, {
  createdAt: 'createTime',
  updatedAt: 'updateTime'
});

CustomsClearance.belongsTo(Order, { foreignKey: 'orderId' });
Order.hasOne(CustomsClearance, { foreignKey: 'orderId' });

module.exports = CustomsClearance; 