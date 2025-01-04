const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ExchangeRate = sequelize.define('ExchangeRate', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fromCurrency: {
    type: DataTypes.STRING(3),
    allowNull: false,
    comment: '源币种'
  },
  toCurrency: {
    type: DataTypes.STRING(3),
    allowNull: false,
    comment: '目标币种'
  },
  rate: {
    type: DataTypes.DECIMAL(10, 6),
    allowNull: false,
    validate: {
      min: 0
    },
    comment: '汇率'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: '是否启用'
  }
}, {
  createdAt: 'createTime',
  updatedAt: 'updateTime'
});

module.exports = ExchangeRate; 