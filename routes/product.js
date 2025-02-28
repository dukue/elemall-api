const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  updateProductStatus,
  getProductWithTranslations,
  getProductTranslations,
  createProductTranslation,
  updateProductTranslation,
  deleteProductTranslation,
  getProductDetail,
  uploadProductImage,
  uploadProductImages
} = require('../controllers/productController');

const {
  getProductInventory,
  setProductInventory,
  getInventoryTransactions,
  transferInventory
} = require('../controllers/warehouseController');

const { authMiddleware } = require('../middleware/authMiddleware');
const { validateProduct, validateProductTranslation, validateInventoryTransfer, validateInventorySetup } = require('../middleware/validator');

// 配置文件上传
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/products')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // 只允许上传图片
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('只允许上传图片文件！'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 限制5MB
  }
});

// 商品列表
router.get('/', authMiddleware, getProducts);

// 创建商品
router.post('/', [authMiddleware, validateProduct], createProduct);

// 更新商品
router.put('/:id', [authMiddleware, validateProduct], updateProduct);

// 删除商品
router.delete('/:id', authMiddleware, deleteProduct);

// 更新商品状态
router.patch('/:id/status', authMiddleware, updateProductStatus);

// 获取商品及其翻译
router.get('/:id/translations', authMiddleware, getProductWithTranslations);

// 获取商品翻译
router.get('/:id/translations/:lang', authMiddleware, getProductTranslations);

// 创建商品翻译
router.post('/:id/translations', [authMiddleware, validateProductTranslation], createProductTranslation);

// 更新商品翻译
router.put('/:id/translations/:lang', [authMiddleware, validateProductTranslation], updateProductTranslation);

// 删除商品翻译
router.delete('/:id/translations/:lang', authMiddleware, deleteProductTranslation);

// 获取商品详情
router.get('/:id', authMiddleware, getProductDetail);

// 上传商品主图
router.post('/:id/image', [authMiddleware, upload.single('image')], uploadProductImage);

// 上传商品图片集
router.post('/:id/images', [authMiddleware, upload.array('images', 10)], uploadProductImages);

// 商品库存管理
router.get('/:id/inventory', authMiddleware, getProductInventory);
router.put('/:id/inventory/transfer', [authMiddleware, validateInventoryTransfer], transferInventory);
router.post('/:id/inventory', [authMiddleware, validateInventorySetup], setProductInventory);
router.get('/:id/inventory/transactions', authMiddleware, getInventoryTransactions);

module.exports = router; 