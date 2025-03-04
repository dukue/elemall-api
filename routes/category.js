const express = require('express');
const router = express.Router();
const { 
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validateCategory } = require('../middleware/validator');
const { upload } = require('../middleware/upload');

// 添加调试中间件
const debugMiddleware = (req, res, next) => {
  console.log('=== Debug Middleware ===');
  console.log('Request method:', req.method);
  console.log('Request path:', req.path);
  console.log('Content-Type:', req.headers['content-type']);
  next();
};

router.get('/', authMiddleware, getCategories);
router.get('/:id', authMiddleware, getCategoryById);
router.post('/', 
  authMiddleware, 
  upload,
  validateCategory,
  createCategory
);
router.put('/:id', [authMiddleware, upload, validateCategory], updateCategory);
router.delete('/:id', authMiddleware, deleteCategory);

module.exports = router; 