const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 确保所有上传目录存在
const createUploadDirs = () => {
  const dirs = [
    'uploads/temp',
    'uploads/products',
    'uploads/categories',
    'uploads/customs'
  ];

  dirs.forEach(dir => {
    const fullPath = path.join(__dirname, '..', dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  });
};

createUploadDirs();

// 配置文件上传
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('Multer destination called for file:', file.fieldname);
    const uploadPath = path.join(__dirname, '..', 'uploads/categories');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    console.log('Multer filename called for file:', file.fieldname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'category-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 限制5MB
  },
  fileFilter: (req, file, cb) => {
    console.log('Multer fileFilter called for file:', file.fieldname);
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('只允许上传图片文件'));
    }
  }
}).single('image');  // 只处理image字段

// 包装 multer 中间件，添加错误处理
const uploadMiddleware = (req, res, next) => {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        code: 400,
        message: '文件上传错误: ' + err.message
      });
    } else if (err) {
      return res.status(500).json({
        code: 500,
        message: '文件上传失败: ' + err.message
      });
    }
    next();
  });
};

module.exports = { upload: uploadMiddleware }; 