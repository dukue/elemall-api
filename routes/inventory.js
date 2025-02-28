const express = require('express');
const router = express.Router();
const { 
  getProductInventory,
  transferInventory,
  setProductInventory,
  getInventoryTransactions
} = require('../controllers/warehouseController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validateInventoryTransfer, validateInventorySetup } = require('../middleware/validator');

// 库存管理
router.get('/products/:id', authMiddleware, getProductInventory);
router.put('/products/:id/transfer', [authMiddleware, validateInventoryTransfer], transferInventory);
router.post('/products/:id', [authMiddleware, validateInventorySetup], setProductInventory);
router.get('/products/:id/transactions', authMiddleware, getInventoryTransactions);

module.exports = router; 