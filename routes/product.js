const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  createProductWithTranslations,
  updateProduct, 
  deleteProduct,
  updateProductStatus,
  getProductTranslations,
  createProductTranslation,
  updateProductTranslation,
  deleteProductTranslation,
  getProductDetail
} = require('../controllers/productController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validateProduct, validateProductTranslation } = require('../middleware/validator');

router.get('/products', authMiddleware, getProducts);
router.post('/products', [authMiddleware, validateProduct], createProductWithTranslations);
router.put('/products/:id', [authMiddleware, validateProduct], updateProduct);
router.delete('/products/:id', authMiddleware, deleteProduct);
router.put('/products/:id/status', authMiddleware, updateProductStatus);
router.get('/products/:id/translations', authMiddleware, getProductTranslations);
router.post('/products/:id/translations', [authMiddleware, validateProductTranslation], createProductTranslation);
router.put('/products/:id/translations/:lang', [authMiddleware, validateProductTranslation], updateProductTranslation);
router.delete('/products/:id/translations/:lang', authMiddleware, deleteProductTranslation);
router.get('/products/:id', authMiddleware, getProductDetail);

module.exports = router; 