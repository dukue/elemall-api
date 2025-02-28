const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./Order');

const ShipmentTracking = sequelize.define('ShipmentTracking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Orders',
      key: 'id'
    }
  },
  trackingNo: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    comment: '物流追踪号'
  },
  carrier: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '承运商'
  },
  status: {
    type: DataTypes.ENUM(
      'pending',      // 待发货
      'in_transit',   // 运输中
      'arrived',      // 已到达
      'customs',      // 清关中
      'delivered',    // 已送达
      'exception',    // 异常
      'returned'      // 已退回
    ),
    allowNull: false,
    defaultValue: 'pending',
    comment: '物流状态'
  },
  estimatedDelivery: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: '预计送达时间'
  },
  originCountry: {
    type: DataTypes.STRING(2),
    allowNull: false,
    comment: '起运国(ISO 3166-1)'
  },
  destinationCountry: {
    type: DataTypes.STRING(2),
    allowNull: false,
    comment: '目的国(ISO 3166-1)'
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

ShipmentTracking.belongsTo(Order, { foreignKey: 'orderId' });
Order.hasOne(ShipmentTracking, { foreignKey: 'orderId' });

ShipmentTracking.associate = (models) => {
  ShipmentTracking.hasMany(models.TrackingHistory, {
    foreignKey: 'trackingId'
  });
};

module.exports = ShipmentTracking; 