const express = require('express');
const router = express.Router();
const multer = require('multer');
const { 
  getCustomsStatus,
  updateCustomsStatus,
  getCustomsDocuments,
  uploadCustomsDocument
} = require('../controllers/customsController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validateCustomsStatus } = require('../middleware/validator');

// 配置文件上传
const upload = multer({ dest: 'uploads/temp/' });

router.get('/orders/:id/customs', authMiddleware, getCustomsStatus);
router.put('/orders/:id/customs/status', [authMiddleware, validateCustomsStatus], updateCustomsStatus);
router.get('/orders/:id/customs/documents', authMiddleware, getCustomsDocuments);
router.post('/orders/:id/customs/documents', [authMiddleware, upload.single('file')], uploadCustomsDocument);

module.exports = router; 