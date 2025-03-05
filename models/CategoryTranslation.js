const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CategoryTranslation = sequelize.define('CategoryTranslation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  languageId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'languages',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
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
  tableName: 'categorytranslations',
  createdAt: 'createTime',
  updatedAt: 'updateTime',
  indexes: [
    {
      unique: true,
      fields: ['categoryId', 'languageId']
    }
  ]
});

module.exports = CategoryTranslation; 