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

router.get('/categories', authMiddleware, getCategories);
router.post('/categories', [authMiddleware, validateCategory], createCategory);
router.put('/categories/:id', [authMiddleware, validateCategory], updateCategory);
router.delete('/categories/:id', authMiddleware, deleteCategory);

module.exports = router; 