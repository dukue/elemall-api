const validateMallUserRegister = (req, res, next) => {
  const { username, password, email, mobile } = req.body;

  if (!username || username.length < 3 || username.length > 50) {
    return res.status(400).json({
      code: 400,
      message: '用户名长度必须在3-50个字符之间'
    });
  }

  if (!password || password.length < 6 || password.length > 20) {
    return res.status(400).json({
      code: 400,
      message: '密码长度必须在6-20个字符之间'
    });
  }

  if (!email || !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) {
    return res.status(400).json({
      code: 400,
      message: '邮箱格式不正确'
    });
  }

  if (!mobile || !/^1[3-9]\d{9}$/.test(mobile)) {
    return res.status(400).json({
      code: 400,
      message: '手机号格式不正确'
    });
  }

  next();
};

const validateMallUserLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      code: 400,
      message: '用户名和密码不能为空'
    });
  }

  next();
};

module.exports = {
  validateMallUserRegister,
  validateMallUserLogin
}; 