const express = require('express');
const router = express.Router();
const { 
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validateCategory } = require('../middleware/validator');

router.get('/', authMiddleware, getCategories);
router.post('/', [authMiddleware, validateCategory], createCategory);
router.put('/:id', [authMiddleware, validateCategory], updateCategory);
router.delete('/:id', authMiddleware, deleteCategory);

module.exports = router; 