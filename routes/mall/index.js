const express = require('express');
const router = express.Router();
const { authMallUser } = require('../../middleware/authMiddleware');
const authRoutes = require('./auth');
const addressRoutes = require('./address');
const cartRoutes = require('./cart');
const orderRoutes = require('./order');
const categoryRoutes = require('./category');
const productRoutes = require('./product');

// 不需要登录的路由
router.use('/', authRoutes);
router.use('/', categoryRoutes);  // 分类路由不需要登录
router.use('/', productRoutes);   // 商品路由不需要登录

// 需要登录的路由
router.use(authMallUser);
router.use('/', addressRoutes);
router.use('/', cartRoutes);
router.use('/', orderRoutes);

module.exports = router; 