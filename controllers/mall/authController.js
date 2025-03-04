const jwt = require('jsonwebtoken');
const MallUser = require('../../models/MallUser');
const config = require('../../config');

exports.register = async (req, res) => {
  try {
    const { username, password, email, mobile } = req.body;

    // 验证用户名是否已存在
    const existingUser = await MallUser.findOne({
      where: { username }
    });

    if (existingUser) {
      return res.status(400).json({
        code: 400,
        message: '用户名已存在'
      });
    }

    // 创建用户
    const user = await MallUser.create({
      username,
      password,
      email,
      mobile
    });

    res.status(201).json({
      code: 200,
      message: '注册成功',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        mobile: user.mobile
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      code: 500,
      message: error.message || '服务器错误'
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 查找用户
    const user = await MallUser.findOne({
      where: { username }
    });

    if (!user || !user.validatePassword(password)) {
      return res.status(401).json({
        code: 401,
        message: '用户名或密码错误'
      });
    }

    if (!user.status) {
      return res.status(403).json({
        code: 403,
        message: '账号已被禁用'
      });
    }

    // 生成 token
    const token = jwt.sign(
      { 
        id: user.id,
        username: user.username,
        type: 'mall_user' // 标识是商城用户
      },
      config.jwtSecret,
      { expiresIn: '7d' } // 商城用户token可以设置更长的有效期
    );

    res.json({
      code: 200,
      message: '登录成功',
      data: {
        token,
        userInfo: {
          id: user.id,
          username: user.username,
          email: user.email,
          mobile: user.mobile,
          avatar: user.avatar
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
}; 