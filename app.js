const express = require('express');
const cors = require('cors');
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
require('./models/associations');

// 在使用任何模型之前确保关联关系已经建立
const app = express();

// 环境变量配置
require('dotenv').config();

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', productRoutes);
app.use('/api/v1', orderRoutes);
app.use('/api/v1', statisticsRoutes);
app.use('/api/v1/i18n', i18nRoutes);
app.use('/api/v1/exchange', exchangeRoutes);
app.use('/api/v1', warehouseRoutes);
app.use('/api/v1', customsRoutes);
app.use('/api/v1', trackingRoutes);
app.use('/api/v1', categoryRoutes);

// 错误处理
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 