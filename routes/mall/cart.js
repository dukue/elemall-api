const express = require('express');
const router = express.Router();
const { addToCart, getCartList, updateCartItem, deleteCartItem } = require('../../controllers/mall/cartController');
const { authMallUser } = require('../../middleware/authMiddleware');
const { validateCartItem, validateCartItemQuantity } = require('../../middleware/mallValidator');

// 所有购物车相关的接口都需要用户认证
router.use(authMallUser);

// 添加商品到购物车
router.post('/cart', validateCartItem, addToCart);

// 获取购物车列表
router.get('/cart', getCartList);

// 更新购物车商品数量
router.put('/cart/:id', validateCartItemQuantity, updateCartItem);

// 删除购物车商品
router.delete('/cart/:id', deleteCartItem);

module.exports = router; 