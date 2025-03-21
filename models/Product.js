const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  weight: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    validate: {
      min: 0
    }
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Category,
      key: 'id'
    }
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '商品主图路径'
  },
  images: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: '商品图片集合'
  },
  sales: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '商品销量'
  }
}, {
  createdAt: 'createTime',
  updatedAt: 'updateTime'
});

Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

module.exports = Product; 