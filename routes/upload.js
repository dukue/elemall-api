const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authMiddleware } = require('../middleware/authMiddleware');

// 配置临时文件上传
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/temp';
    // 确保目录存在
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // 生成唯一文件名
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
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

// 临时文件上传接口
router.post('/temp-upload', [authMiddleware, upload.single('file')], async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        code: 400,
        message: '请选择要上传的文件'
      });
    }

    // 返回文件信息
    res.json({
      code: 200,
      message: '文件上传成功',
      data: {
        filename: req.file.filename,
        path: req.file.path.replace(/\\/g, '/'),
        mimetype: req.file.mimetype,
        size: req.file.size
      }
    });
  } catch (error) {
    console.error('Temp file upload error:', error);
    res.status(500).json({
      code: 500,
      message: '文件上传失败'
    });
  }
});

// 定期清理临时文件的函数
const cleanupTempFiles = () => {
  const tempDir = 'uploads/temp';
  const expirationTime = 24 * 60 * 60 * 1000; // 24小时

  fs.readdir(tempDir, (err, files) => {
    if (err) {
      console.error('Failed to read temp directory:', err);
      return;
    }

    const now = Date.now();
    files.forEach(file => {
      const filePath = path.join(tempDir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Failed to get file stats for ${file}:`, err);
          return;
        }

        // 如果文件超过24小时就删除
        if (now - stats.mtimeMs > expirationTime) {
          fs.unlink(filePath, err => {
            if (err) {
              console.error(`Failed to delete temp file ${file}:`, err);
            } else {
              console.log(`Deleted expired temp file: ${file}`);
            }
          });
        }
      });
    });
  });
};

// 每6小时运行一次清理
setInterval(cleanupTempFiles, 6 * 60 * 60 * 1000);

module.exports = router; 