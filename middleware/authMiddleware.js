const jwt = require('jsonwebtoken');
const config = require('../config');
const MallUser = require('../models/MallUser');

// 后台管理员认证中间件
exports.authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        code: 401,
        message: '未授权访问'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      code: 401,
      message: '无效的token'
    });
  }
};

// 商城用户认证中间件
exports.authMallUser = async (req, res, next) => {
  try {
    // 获取token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        code: 401,
        message: '未登录或token已过期'
      });
    }

    const token = authHeader.split(' ')[1];

    // 验证token
    const decoded = jwt.verify(token, config.jwtSecret);
    
    // 验证用户类型
    if (decoded.type !== 'mall_user') {
      return res.status(403).json({
        code: 403,
        message: '无权限访问'
      });
    }

    // 查找用户
    const user = await MallUser.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({
        code: 401,
        message: '用户不存在'
      });
    }

    // 检查用户状态
    if (!user.status) {
      return res.status(403).json({
        code: 403,
        message: '账号已被禁用'
      });
    }

    // 将用户信息添加到请求对象中
    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      mobile: user.mobile,
      avatar: user.avatar
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({
        code: 401,
        message: '未登录或token已过期'
      });
    }

    console.error('认证中间件错误:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
}; 