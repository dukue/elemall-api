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

const validateMallUserUpdate = (req, res, next) => {
  const { email, mobile } = req.body;

  if (email && !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) {
    return res.status(400).json({
      code: 400,
      message: '邮箱格式不正确'
    });
  }

  if (mobile && !/^1[3-9]\d{9}$/.test(mobile)) {
    return res.status(400).json({
      code: 400,
      message: '手机号格式不正确'
    });
  }

  next();
};

const validatePasswordUpdate = (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      code: 400,
      message: '原密码和新密码不能为空'
    });
  }

  if (newPassword.length < 6 || newPassword.length > 20) {
    return res.status(400).json({
      code: 400,
      message: '新密码长度必须在6-20个字符之间'
    });
  }

  next();
};

// 添加地址验证
const validateAddress = (req, res, next) => {
  const { receiverName, receiverPhone, province, city, district, detailAddress } = req.body;

  if (!receiverName || receiverName.length < 2 || receiverName.length > 50) {
    return res.status(400).json({
      code: 400,
      message: '收货人姓名长度必须在2-50个字符之间'
    });
  }

  if (!receiverPhone || !/^1[3-9]\d{9}$/.test(receiverPhone)) {
    return res.status(400).json({
      code: 400,
      message: '手机号格式不正确'
    });
  }

  if (!province || !city || !district) {
    return res.status(400).json({
      code: 400,
      message: '省市区信息不完整'
    });
  }

  if (!detailAddress || detailAddress.length < 5 || detailAddress.length > 200) {
    return res.status(400).json({
      code: 400,
      message: '详细地址长度必须在5-200个字符之间'
    });
  }

  next();
};

// 购物车商品数量验证
const validateCartItem = (req, res, next) => {
  const { quantity, productId } = req.body;

  // 转换为数字类型
  const quantityNum = parseInt(quantity, 10);
  const productIdNum = parseInt(productId, 10);

  if (isNaN(quantityNum) || quantityNum < 1) {
    return res.status(400).json({
      code: 400,
      message: '商品数量必须为大于0的整数'
    });
  }

  if (isNaN(productIdNum) || productIdNum < 1) {
    return res.status(400).json({
      code: 400,
      message: '商品ID无效'
    });
  }

  // 将转换后的数字赋值回请求体
  req.body.quantity = quantityNum;
  req.body.productId = productIdNum;

  next();
};

// 购物车商品数量验证
const validateCartItemQuantity = (req, res, next) => {
  const { quantity } = req.body;

  // 转换为数字类型
  const quantityNum = parseInt(quantity, 10);

  if (isNaN(quantityNum) || quantityNum < 1) {
    return res.status(400).json({
      code: 400,
      message: '商品数量必须为大于0的整数'
    });
  }

  // 将转换后的数字赋值回请求体
  req.body.quantity = quantityNum;

  next();
};

// 订单验证
const validateOrder = (req, res, next) => {
  const { addressId, items } = req.body;

  if (!addressId) {
    return res.status(400).json({
      code: 400,
      message: '收货地址不能为空'
    });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      code: 400,
      message: '订单商品不能为空'
    });
  }

  for (const item of items) {
    if (!item.productId || !item.quantity) {
      return res.status(400).json({
        code: 400,
        message: '商品信息不完整'
      });
    }

    const quantity = parseInt(item.quantity, 10);
    if (isNaN(quantity) || quantity < 1) {
      return res.status(400).json({
        code: 400,
        message: '商品数量必须为大于0的整数'
      });
    }

    // 将转换后的数字赋值回请求体
    item.quantity = quantity;
  }

  next();
};

module.exports = {
  validateMallUserRegister,
  validateMallUserLogin,
  validateMallUserUpdate,
  validatePasswordUpdate,
  validateAddress,
  validateCartItem,
  validateCartItemQuantity,
  validateOrder
}; 