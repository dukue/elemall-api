require('dotenv').config();

module.exports = {
  // JWT配置
  jwtSecret: process.env.JWT_SECRET,
  
  // 上传文件配置
  upload: {
    baseUrl: '/api/v1/uploads',
    path: 'uploads',
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
      files: 10
    },
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif']
  }
}; 