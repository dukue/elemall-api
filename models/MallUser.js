const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const MallUser = sequelize.define('mall_user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 50]
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 100]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  mobile: {
    type: DataTypes.STRING(11),
    allowNull: false,
    unique: true,
    validate: {
      is: /^1[3-9]\d{9}$/
    }
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  timestamps: true,
  createdAt: 'createTime',
  updatedAt: 'updateTime',
  indexes: [
    {
      unique: true,
      fields: ['username']
    },
    {
      unique: true,
      fields: ['email']
    },
    {
      unique: true,
      fields: ['mobile']
    }
  ]
});

// 密码加密
MallUser.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// 密码验证方法
MallUser.prototype.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = MallUser; 