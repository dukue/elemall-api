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
    comment: '源币种代码，如: USD'
  },
  toCurrency: {
    type: DataTypes.STRING(3),
    allowNull: false,
    comment: '目标币种代码，如: CNY'
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
    defaultValue: true,
    comment: '是否启用'
  }
}, {
  createdAt: 'createTime',
  updatedAt: 'updateTime',
  indexes: [
    {
      unique: true,
      fields: ['fromCurrency', 'toCurrency']
    }
  ]
});

module.exports = ExchangeRate; 