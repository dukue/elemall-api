const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getOrderList, 
  getOrderDetail, 
  cancelOrder, 
  confirmOrder 
} = require('../../controllers/mall/orderController');
const { authMallUser } = require('../../middleware/authMiddleware');
const { validateOrder } = require('../../middleware/mallValidator');

// 所有订单相关的接口都需要用户认证
router.use(authMallUser);

// 创建订单
router.post('/order', validateOrder, createOrder);

// 获取订单列表
router.get('/order', getOrderList);

// 获取订单详情
router.get('/order/:orderId', getOrderDetail);

// 取消订单
router.put('/order/:orderId/cancel', cancelOrder);

// 确认收货
router.put('/order/:orderId/confirm', confirmOrder);

module.exports = router; 