const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const addressRoutes = require('./address');
const cartRoutes = require('./cart');
const orderRoutes = require('./order');
const categoryRoutes = require('./category');
const productRoutes = require('./product');

// 用户相关路由
router.use('/', authRoutes);
// 地址相关路由
router.use('/', addressRoutes);
// 购物车相关路由
router.use('/', cartRoutes);
// 订单相关路由
router.use('/', orderRoutes);
// 分类相关路由
router.use('/', categoryRoutes);
// 商品相关路由
router.use('/', productRoutes);

module.exports = router; 