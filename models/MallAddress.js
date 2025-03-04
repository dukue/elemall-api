const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const MallUser = require('./MallUser');

const MallAddress = sequelize.define('mall_address', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'mall_users',
      key: 'id'
    }
  },
  receiverName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  receiverPhone: {
    type: DataTypes.STRING(11),
    allowNull: false,
    validate: {
      is: /^1[3-9]\d{9}$/
    }
  },
  province: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  district: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  detailAddress: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  timestamps: true,
  createdAt: 'createTime',
  updatedAt: 'updateTime',
  indexes: [
    {
      fields: ['userId']
    }
  ]
});

// 建立与用户的关联关系
MallAddress.belongsTo(MallUser, {
  foreignKey: 'userId',
  as: 'user'
});

MallUser.hasMany(MallAddress, {
  foreignKey: 'userId',
  as: 'addresses'
});

module.exports = MallAddress; 