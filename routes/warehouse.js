const express = require('express');
const router = express.Router();
const { 
  getWarehouses,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse
} = require('../controllers/warehouseController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validateWarehouse } = require('../middleware/validator');

// 仓库管理
router.get('/', authMiddleware, getWarehouses);
router.post('/', [authMiddleware, validateWarehouse], createWarehouse);
router.put('/:id', [authMiddleware, validateWarehouse], updateWarehouse);
router.delete('/:id', authMiddleware, deleteWarehouse);

module.exports = router; 