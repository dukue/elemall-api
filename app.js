const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const statisticsRoutes = require('./routes/statistics');
const i18nRoutes = require('./routes/i18n');
const errorHandler = require('./middleware/errorHandler');
const exchangeRoutes = require('./routes/exchange');
const warehouseRoutes = require('./routes/warehouse');
const customsRoutes = require('./routes/customs');
const trackingRoutes = require('./routes/tracking');
const categoryRoutes = require('./routes/category');
const uploadRoutes = require('./routes/upload');
const inventoryRoutes = require('./routes/inventory');
require('./models/associations');

// 在使用任何模型之前确保关联关系已经建立
const app = express();

// 环境变量配置
require('dotenv').config();

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 添加静态文件服务
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API路由
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/statistics', statisticsRoutes);
app.use('/api/v1/i18n', i18nRoutes);
app.use('/api/v1/exchange', exchangeRoutes);
app.use('/api/v1/warehouses', warehouseRoutes);
app.use('/api/v1/inventory', inventoryRoutes);
app.use('/api/v1/customs', customsRoutes);
app.use('/api/v1', trackingRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1', uploadRoutes);

// 后台管理路由
app.use('/api/v1', require('./routes/auth'));

// 前台商城路由
app.use('/api/v1/mall', require('./routes/mall/auth'));
app.use('/api/v1/mall', require('./routes/mall/product'));

// 错误处理
app.use(errorHandler);

// 在开发环境下清除模块缓存
if (process.env.NODE_ENV === 'development') {
  Object.keys(require.cache).forEach(function(key) {
    delete require.cache[key];
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 