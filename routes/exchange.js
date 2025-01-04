const express = require('express');
const router = express.Router();
const { 
  getRates,
  createRate,
  updateRate
} = require('../controllers/exchangeController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/rates', authMiddleware, getRates);
router.post('/rates', authMiddleware, createRate);
router.put('/rates/:id', authMiddleware, updateRate);

module.exports = router; 