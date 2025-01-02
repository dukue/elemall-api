const express = require('express');
const router = express.Router();
const { 
  getWarehouses,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  getProductInventory,
  transferInventory
} = require('../controllers/warehouseController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validateWarehouse, validateInventoryTransfer } = require('../middleware/validator');

// 仓库管理
router.get('/warehouses', authMiddleware, getWarehouses);
router.post('/warehouses', [authMiddleware, validateWarehouse], createWarehouse);
router.put('/warehouses/:id', [authMiddleware, validateWarehouse], updateWarehouse);
router.delete('/warehouses/:id', authMiddleware, deleteWarehouse);

// 库存管理
router.get('/products/:id/inventory', authMiddleware, getProductInventory);
router.put('/products/:id/inventory/transfer', [authMiddleware, validateInventoryTransfer], transferInventory);

module.exports = router; 