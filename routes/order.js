const express = require('express');
const router = express.Router();
const { 
  getOrders, 
  getOrderDetail,
  updateOrderStatus 
} = require('../controllers/orderController');

const {
  getCustomsStatus,
  updateCustomsStatus,
  getCustomsDocuments,
  uploadCustomsDocument,
  downloadCustomsDocument
} = require('../controllers/customsController');

const { authMiddleware } = require('../middleware/authMiddleware');
const { validateOrderStatus, validateCustomsStatus } = require('../middleware/validator');
const multer = require('multer');
const path = require('path');

// 配置清关文件上传
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/customs')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 限制10MB
  }
});

// 订单基础接口
router.get('/', authMiddleware, getOrders);
router.get('/:id', authMiddleware, getOrderDetail);
router.put('/:id/status', [authMiddleware, validateOrderStatus], updateOrderStatus);

// 订单清关接口
router.get('/:id/customs', authMiddleware, getCustomsStatus);
router.put('/:id/customs/status', [authMiddleware, validateCustomsStatus], updateCustomsStatus);
router.get('/:id/customs/documents', authMiddleware, getCustomsDocuments);
router.post('/:id/customs/documents', [authMiddleware, upload.single('file')], uploadCustomsDocument);
router.get('/customs/documents/:id', authMiddleware, downloadCustomsDocument);

module.exports = router; 