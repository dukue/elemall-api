const express = require('express');
const router = express.Router();
const { getProducts, getProductDetail } = require('../../controllers/mall/productController');

// 获取商品列表
router.get('/products', getProducts);

// 获取商品详情
router.get('/products/:id', getProductDetail);

module.exports = router; 