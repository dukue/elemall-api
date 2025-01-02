const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ShipmentTracking = require('./ShipmentTracking');

const TrackingHistory = sequelize.define('TrackingHistory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  trackingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ShipmentTracking,
      key: 'id'
    }
  },
  location: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '位置信息'
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '状态描述'
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '详细说明'
  },
  eventTime: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: '事件发生时间'
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

TrackingHistory.belongsTo(ShipmentTracking, { foreignKey: 'trackingId' });
ShipmentTracking.hasMany(TrackingHistory, { foreignKey: 'trackingId' });

module.exports = TrackingHistory; 