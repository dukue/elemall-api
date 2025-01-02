const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 从数据库查找用户
    const user = await User.findOne({ where: { username } });
    
    // 验证用户是否存在
    if (!user) {
      return res.status(400).json({
        code: 400,
        message: '用户名或密码错误'
      });
    }

    // 验证密码
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        code: 400,
        message: '用户名或密码错误'
      });
    }

    // 生成 JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // 返回成功响应
    res.json({
      code: 200,
      message: '登录成功',
      data: {
        token,
        userInfo: {
          id: user.id,
          username: user.username,
          role: user.role,
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

exports.updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // 验证状态值
    if (typeof status !== 'boolean') {
      return res.status(400).json({
        code: 400,
        message: '状态值必须是布尔类型'
      });
    }

    // 查找用户
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: '用户不存在'
      });
    }

    // 检查权限
    const currentUser = req.user;
    if (currentUser.role !== 'admin') {
      return res.status(403).json({
        code: 403,
        message: '只有管理员可以修改用户状态'
      });
    }

    // 不允许修改自己的状态
    if (currentUser.id === Number(id)) {
      return res.status(400).json({
        code: 400,
        message: '不能修改当前登录用户的状态'
      });
    }

    // 更新用户状态
    await user.update({ status });

    res.json({
      code: 200,
      message: '用户状态更新成功',
      data: {
        id: user.id,
        username: user.username,
        status: user.status
      }
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
}; 