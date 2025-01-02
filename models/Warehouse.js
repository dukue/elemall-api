const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Warehouse = sequelize.define('Warehouse', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    comment: '仓库代码'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '仓库名称'
  },
  location: {
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: '仓库地址'
  },
  country: {
    type: DataTypes.STRING(2),
    allowNull: false,
    comment: '国家代码(ISO 3166-1 alpha-2)'
  },
  contact: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: '联系人'
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment: '联系电话'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: '是否启用'
  }
}, {
  createdAt: 'createTime',
  updatedAt: 'updateTime'
});

module.exports = Warehouse; 