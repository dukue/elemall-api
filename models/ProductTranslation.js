const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');
const Language = require('./Language');

const ProductTranslation = sequelize.define('ProductTranslation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  specifications: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: '商品规格的多语言信息'
  },
  seoTitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  seoDescription: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  seoKeywords: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  createdAt: 'createTime',
  updatedAt: 'updateTime',
  indexes: [
    {
      unique: true,
      fields: ['productId', 'languageId']
    }
  ]
});

// 设置关联关系
Product.hasMany(ProductTranslation, { foreignKey: 'productId' });
ProductTranslation.belongsTo(Product, { foreignKey: 'productId' });
ProductTranslation.belongsTo(Language, { foreignKey: 'languageId' });

module.exports = ProductTranslation; 