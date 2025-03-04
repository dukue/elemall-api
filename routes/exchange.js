const express = require('express');
const router = express.Router();
const { 
  getRates,
  createRate,
  updateRate,
  convertAmount
} = require('../controllers/exchangeController');
const { authMiddleware } = require('../middleware/authMiddleware');

// 获取和管理汇率
router.get('/rates', authMiddleware, getRates);
router.post('/rates', authMiddleware, createRate);
router.put('/rates/:id', authMiddleware, updateRate);

// 汇率转换
router.get('/convert', authMiddleware, convertAmount);

module.exports = router; 