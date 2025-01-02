const express = require('express');
const router = express.Router();
const { 
  getRates,
  createRate,
  updateRate,
  convertAmount
} = require('../controllers/exchangeController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validateExchangeRate } = require('../middleware/validator');

router.get('/rates', authMiddleware, getRates);
router.post('/rates', [authMiddleware, validateExchangeRate], createRate);
router.put('/rates/:id', [authMiddleware, validateExchangeRate], updateRate);
router.get('/convert', authMiddleware, convertAmount);

module.exports = router; 