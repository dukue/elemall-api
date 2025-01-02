const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  database: 'elemall_data',
  username: 'root',
  password: '123456',
  host: '127.0.0.1',
  port: '3307',
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8mb4'
  },
  logging: false
});

// 测试数据库连接
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

module.exports = sequelize; 