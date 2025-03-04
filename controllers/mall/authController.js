const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const MallUser = require('../../models/MallUser');
const config = require('../../config');

// 用户注册
exports.register = async (req, res) => {
  try {
    const { username, password, email, mobile } = req.body;

    // 检查用户名是否已存在
    const existingUser = await MallUser.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({
        code: 400,
        message: '用户名已存在'
      });
    }

    // 检查邮箱是否已存在
    const existingEmail = await MallUser.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({
        code: 400,
        message: '邮箱已被注册'
      });
    }

    // 检查手机号是否已存在
    const existingMobile = await MallUser.findOne({ where: { mobile } });
    if (existingMobile) {
      return res.status(400).json({
        code: 400,
        message: '手机号已被注册'
      });
    }

    // 创建新用户
    const user = await MallUser.create({
      username,
      password, // 密码加密在模型中处理
      email,
      mobile
    });

    res.status(200).json({
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
    console.error('注册失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误，注册失败'
    });
  }
};

// 用户登录
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 查找用户
    const user = await MallUser.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({
        code: 401,
        message: '用户名或密码错误'
      });
    }

    // 验证密码
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        code: 401,
        message: '用户名或密码错误'
      });
    }

    // 检查用户状态
    if (!user.status) {
      return res.status(403).json({
        code: 403,
        message: '账号已被禁用'
      });
    }

    // 生成 JWT token
    const token = jwt.sign(
      { 
        id: user.id,
        username: user.username,
        type: 'mall_user'
      },
      config.jwtSecret,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      code: 200,
      message: '登录成功',
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          mobile: user.mobile,
          avatar: user.avatar
        }
      }
    });
  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误，登录失败'
    });
  }
};

// 获取用户信息
exports.getUserInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await MallUser.findByPk(userId, {
      attributes: ['id', 'username', 'email', 'mobile', 'avatar']
    });

    if (!user) {
      return res.status(404).json({
        code: 404,
        message: '用户不存在'
      });
    }

    res.status(200).json({
      code: 200,
      data: user
    });
  } catch (error) {
    console.error('获取用户信息失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

// 更新用户信息
exports.updateUserInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const { email, mobile, avatar } = req.body;

    const user = await MallUser.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: '用户不存在'
      });
    }

    // 检查邮箱是否被其他用户使用
    if (email && email !== user.email) {
      const existingEmail = await MallUser.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({
          code: 400,
          message: '该邮箱已被使用'
        });
      }
      user.email = email;
    }

    // 检查手机号是否被其他用户使用
    if (mobile && mobile !== user.mobile) {
      const existingMobile = await MallUser.findOne({ where: { mobile } });
      if (existingMobile) {
        return res.status(400).json({
          code: 400,
          message: '该手机号已被使用'
        });
      }
      user.mobile = mobile;
    }

    // 更新头像
    if (avatar) {
      user.avatar = avatar;
    }

    await user.save();

    res.status(200).json({
      code: 200,
      message: '更新成功',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('更新用户信息失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

// 修改密码
exports.updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const user = await MallUser.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: '用户不存在'
      });
    }

    // 验证旧密码
    const isValidPassword = await user.validatePassword(oldPassword);
    if (!isValidPassword) {
      return res.status(400).json({
        code: 400,
        message: '原密码错误'
      });
    }

    // 加密新密码
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      code: 200,
      message: '密码修改成功'
    });
  } catch (error) {
    console.error('修改密码失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
}; 