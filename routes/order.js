const express = require('express');
const router = express.Router();
const { 
  getOrders, 
  getOrderDetail,
  updateOrderStatus 
} = require('../controllers/orderController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validateOrderStatus } = require('../middleware/validator');

router.get('/orders', authMiddleware, getOrders);
router.get('/orders/:id', authMiddleware, getOrderDetail);
router.put('/orders/:id/status', [authMiddleware, validateOrderStatus], updateOrderStatus);

module.exports = router; 