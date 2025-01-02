const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const CustomsClearance = require('./CustomsClearance');

const CustomsDocument = sequelize.define('CustomsDocument', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  clearanceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CustomsClearance,
      key: 'id'
    }
  },
  type: {
    type: DataTypes.ENUM(
      'invoice',          // 发票
      'packing_list',     // 装箱单
      'declaration',      // 报关单
      'inspection_cert',  // 查验证书
      'other'            // 其他文件
    ),
    allowNull: false,
    comment: '文件类型'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '文件名称'
  },
  path: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '文件路径'
  },
  uploaderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    },
    comment: '上传人ID'
  }
}, {
  createdAt: 'createTime',
  updatedAt: 'updateTime'
});

CustomsDocument.belongsTo(CustomsClearance, { foreignKey: 'clearanceId' });
CustomsClearance.hasMany(CustomsDocument, { foreignKey: 'clearanceId' });

module.exports = CustomsDocument; 