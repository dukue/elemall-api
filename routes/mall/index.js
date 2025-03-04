const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const addressRoutes = require('./address');
const cartRoutes = require('./cart');
const orderRoutes = require('./order');

// 用户相关路由
router.use('/', authRoutes);
// 地址相关路由
router.use('/', addressRoutes);
// 购物车相关路由
router.use('/', cartRoutes);
// 订单相关路由
router.use('/', orderRoutes);

module.exports = router; 