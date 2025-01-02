const { Op } = require('sequelize');
const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const { query = '', pagenum = 1, pagesize = 10 } = req.query;
    const offset = (pagenum - 1) * pagesize;

    // 构建查询条件
    const whereClause = query
      ? {
          [Op.or]: [
            { username: { [Op.like]: `%${query}%` } },
            { email: { [Op.like]: `%${query}%` } },
            { mobile: { [Op.like]: `%${query}%` } }
          ]
        }
      : {};

    // 查询用户列表和总数
    const { count, rows } = await User.findAndCountAll({
      where: whereClause,
      attributes: { exclude: ['password'] }, // 排除密码字段
      offset: Number(offset),
      limit: Number(pagesize),
      order: [['createTime', 'DESC']]
    });

    // 格式化响应数据
    const users = rows.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      status: user.status,
      createTime: user.createTime
    }));

    res.json({
      code: 200,
      message: '获取用户列表成功',
      data: {
        total: count,
        users
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, password, email, mobile, role } = req.body;

    // 验证必填字段
    if (!username || !password) {
      return res.status(400).json({
        code: 400,
        message: '用户名和密码不能为空'
      });
    }

    // 检查用户名是否已存在
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({
        code: 400,
        message: '用户名已存在'
      });
    }

    // 创建新用户
    const user = await User.create({
      username,
      password,
      email,
      mobile,
      role: role || 'user' // 如果未指定角色，默认为普通用户
    });

    // 返回创建的用户信息（不包含密码）
    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      status: user.status,
      createTime: user.createTime
    };

    res.status(201).json({
      code: 200,
      message: '用户创建成功',
      data: userData
    });
  } catch (error) {
    console.error('Create user error:', error);
    
    // 处理验证错误
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        code: 400,
        message: error.errors[0].message
      });
    }

    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, mobile, role, status } = req.body;

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
    if (currentUser.role !== 'admin' && currentUser.id !== Number(id)) {
      return res.status(403).json({
        code: 403,
        message: '没有权限修改该用户'
      });
    }

    // 如果不是管理员，不能修改角色
    if (currentUser.role !== 'admin' && role) {
      return res.status(403).json({
        code: 403,
        message: '只有管理员可以修改用户角色'
      });
    }

    // 更新用户信息
    const updateData = {};
    if (email) updateData.email = email;
    if (mobile) updateData.mobile = mobile;
    if (role && currentUser.role === 'admin') updateData.role = role;
    if (typeof status === 'boolean' && currentUser.role === 'admin') {
      updateData.status = status;
    }

    await user.update(updateData);

    // 返回更新后的用户信息
    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      status: user.status,
      createTime: user.createTime,
      updateTime: user.updateTime
    };

    res.json({
      code: 200,
      message: '用户信息更新成功',
      data: userData
    });
  } catch (error) {
    console.error('Update user error:', error);
    
    // 处理验证错误
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        code: 400,
        message: error.errors[0].message
      });
    }

    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
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
        message: '只有管理员可以删除用户'
      });
    }

    // 不允许删除自己
    if (currentUser.id === Number(id)) {
      return res.status(400).json({
        code: 400,
        message: '不能删除当前登录用户'
      });
    }

    // 删除用户
    await user.destroy();

    res.json({
      code: 200,
      message: '用户删除成功'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
}; 