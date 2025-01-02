const validateUserCreate = (req, res, next) => {
  const { username, password, email, mobile } = req.body;

  // 验证用户名
  if (!username || username.length < 3 || username.length > 20) {
    return res.status(400).json({
      code: 400,
      message: '用户名长度应在3-20个字符之间'
    });
  }

  // 验证密码
  if (!password || password.length < 6 || password.length > 20) {
    return res.status(400).json({
      code: 400,
      message: '密码长度应在6-20个字符之间'
    });
  }

  // 验证邮箱格式（如果提供）
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      code: 400,
      message: '邮箱格式不正确'
    });
  }

  // 验证手机号格式（如果提供）
  if (mobile && !/^1[3-9]\d{9}$/.test(mobile)) {
    return res.status(400).json({
      code: 400,
      message: '手机号格式不正确'
    });
  }

  next();
};

const validateUserUpdate = (req, res, next) => {
  const { email, mobile, role, status } = req.body;

  // 验证邮箱格式（如果提供）
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      code: 400,
      message: '邮箱格式不正确'
    });
  }

  // 验证手机号格式（如果提供）
  if (mobile && !/^1[3-9]\d{9}$/.test(mobile)) {
    return res.status(400).json({
      code: 400,
      message: '手机号格式不正确'
    });
  }

  // 验证角色（如果提供）
  if (role && !['admin', 'user'].includes(role)) {
    return res.status(400).json({
      code: 400,
      message: '无效的用户角色'
    });
  }

  // 验证状态（如果提供）
  if (typeof status !== 'undefined' && typeof status !== 'boolean') {
    return res.status(400).json({
      code: 400,
      message: '状态必须是布尔值'
    });
  }

  next();
};

const validateProduct = (req, res, next) => {
  const { price, weight, status, categoryId, translations } = req.body;

  // 验证基本信息
  if (typeof price !== 'number' || price < 0 || price > 999999.99) {
    return res.status(400).json({
      code: 400,
      message: '商品价格必须是0-999999.99之间的数字'
    });
  }

  if (weight !== undefined && (typeof weight !== 'number' || weight < 0 || weight > 999999.99)) {
    return res.status(400).json({
      code: 400,
      message: '商品重量必须是0-999999.99之间的数字'
    });
  }

  // 验证多语言信息
  if (!translations || typeof translations !== 'object') {
    return res.status(400).json({
      code: 400,
      message: '商品翻译信息不能为空'
    });
  }

  // 验证每种语言的商品信息
  for (const [lang, data] of Object.entries(translations)) {
    // 验证名称
    if (!data.name || data.name.trim().length < 2 || data.name.trim().length > 100) {
      return res.status(400).json({
        code: 400,
        message: `${lang}语言的商品名称长度应在2-100个字符之间`
      });
    }

    // 验证描述（如果提供）
    if (data.description && data.description.trim().length > 1000) {
      return res.status(400).json({
        code: 400,
        message: `${lang}语言的商品描述不能超过1000个字符`
      });
    }

    // 验证规格信息（如果提供）
    if (data.specifications && typeof data.specifications !== 'object') {
      return res.status(400).json({
        code: 400,
        message: `${lang}语言的规格信息格式不正确`
      });
    }
  }

  next();
};

const validateOrderStatus = (req, res, next) => {
  const { status } = req.body;
  const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      code: 400,
      message: '无效的订单状态'
    });
  }

  next();
};

const validateLanguage = (req, res, next) => {
  const { code, name, isDefault } = req.body;
  const isUpdate = req.method === 'PUT';

  // 只在创建时验证语言代码
  if (!isUpdate) {
    if (!code || !/^[a-z]{2,3}$/.test(code)) {
      return res.status(400).json({
        code: 400,
        message: '语言代码必须是2-3个小写字母'
      });
    }
  }

  // 验证语言名称
  if (!name || name.trim().length < 1 || name.trim().length > 50) {
    return res.status(400).json({
      code: 400,
      message: '语言名称长度应在1-50个字符之间'
    });
  }

  // 验证默认语言标志（如果提供）
  if (typeof isDefault !== 'undefined' && typeof isDefault !== 'boolean') {
    return res.status(400).json({
      code: 400,
      message: '默认语言标志必须是布尔值'
    });
  }

  next();
};

const validateExchangeRate = (req, res, next) => {
  const { fromCurrency, toCurrency, rate } = req.body;
  const isUpdate = req.method === 'PUT';

  // 在更新时这些字段是可选的
  if (!isUpdate) {
    // 验证源币种
    if (!fromCurrency || !/^[A-Z]{3}$/.test(fromCurrency)) {
      return res.status(400).json({
        code: 400,
        message: '源币种必须是3个大写字母'
      });
    }

    // 验证目标币种
    if (!toCurrency || !/^[A-Z]{3}$/.test(toCurrency)) {
      return res.status(400).json({
        code: 400,
        message: '目标币种必须是3个大写字母'
      });
    }

    // 不能是相同的币种
    if (fromCurrency === toCurrency) {
      return res.status(400).json({
        code: 400,
        message: '源币种和目标币种不能相同'
      });
    }
  }

  // 验证汇率
  if (rate !== undefined) {
    if (typeof rate !== 'number' || rate <= 0) {
      return res.status(400).json({
        code: 400,
        message: '汇率必须是大于0的数字'
      });
    }
  }

  next();
};

const validateProductTranslation = (req, res, next) => {
  const { name, description, specifications } = req.body;
  const isUpdate = req.method === 'PUT';

  // 验证商品名称
  if (!name || name.trim().length < 2 || name.trim().length > 100) {
    return res.status(400).json({
      code: 400,
      message: '商品名称长度应在2-100个字符之间'
    });
  }

  // 验证商品描述（如果提供）
  if (description && description.trim().length > 1000) {
    return res.status(400).json({
      code: 400,
      message: '商品描述不能超过1000个字符'
    });
  }

  // 验证规格信息（如果提供）
  if (specifications && typeof specifications !== 'object') {
    return res.status(400).json({
      code: 400,
      message: '商品规格必须是对象格式'
    });
  }

  next();
};

const validateWarehouse = (req, res, next) => {
  const { code, name, location, country, contact, phone } = req.body;
  const isUpdate = req.method === 'PUT';

  if (!isUpdate) {
    // 验证仓库代码
    if (!code || !/^[A-Z0-9]{3,20}$/.test(code)) {
      return res.status(400).json({
        code: 400,
        message: '仓库代码必须是3-20位大写字母或数字'
      });
    }
  }

  // 验证仓库名称
  if (!name || name.trim().length < 2 || name.trim().length > 100) {
    return res.status(400).json({
      code: 400,
      message: '仓库名称长度应在2-100个字符之间'
    });
  }

  // 验证仓库地址
  if (!location || location.trim().length < 5 || location.trim().length > 200) {
    return res.status(400).json({
      code: 400,
      message: '仓库地址长度应在5-200个字符之间'
    });
  }

  // 验证国家代码
  if (!country || !/^[A-Z]{2}$/.test(country)) {
    return res.status(400).json({
      code: 400,
      message: '国家代码必须是2位大写字母(ISO 3166-1)'
    });
  }

  // 验证联系人（如果提供）
  if (contact && (contact.trim().length < 2 || contact.trim().length > 50)) {
    return res.status(400).json({
      code: 400,
      message: '联系人名称长度应在2-50个字符之间'
    });
  }

  // 验证电话（如果提供）
  if (phone && !/^\+?[\d\-\s]{5,20}$/.test(phone)) {
    return res.status(400).json({
      code: 400,
      message: '请输入有效的电话号码'
    });
  }

  next();
};

const validateInventoryTransfer = (req, res, next) => {
  const { fromWarehouseId, toWarehouseId, quantity, reason } = req.body;

  // 验证源仓库ID
  if (!fromWarehouseId || !Number.isInteger(fromWarehouseId) || fromWarehouseId <= 0) {
    return res.status(400).json({
      code: 400,
      message: '请提供有效的源仓库ID'
    });
  }

  // 验证目标仓库ID
  if (!toWarehouseId || !Number.isInteger(toWarehouseId) || toWarehouseId <= 0) {
    return res.status(400).json({
      code: 400,
      message: '请提供有效的目标仓库ID'
    });
  }

  // 不能是同一个仓库
  if (fromWarehouseId === toWarehouseId) {
    return res.status(400).json({
      code: 400,
      message: '源仓库和目标仓库不能相同'
    });
  }

  // 验证数量
  if (!quantity || !Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({
      code: 400,
      message: '调拨数量必须是大于0的整数'
    });
  }

  // 验证原因（如果提供）
  if (reason && reason.trim().length > 200) {
    return res.status(400).json({
      code: 400,
      message: '原因说明不能超过200个字符'
    });
  }

  next();
};

const validateCustomsStatus = (req, res, next) => {
  const { status, declarationNo, customsOffice } = req.body;
  const validStatuses = ['pending', 'submitted', 'inspecting', 'approved', 'rejected', 'completed'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      code: 400,
      message: '无效的清关状态'
    });
  }

  if (status === 'submitted' && !declarationNo) {
    return res.status(400).json({
      code: 400,
      message: '提交状态需要提供报关单号'
    });
  }

  if (declarationNo && declarationNo.length > 50) {
    return res.status(400).json({
      code: 400,
      message: '报关单号不能超过50个字符'
    });
  }

  if (customsOffice && customsOffice.length > 100) {
    return res.status(400).json({
      code: 400,
      message: '海关关区不能超过100个字符'
    });
  }

  next();
};

const validateTracking = (req, res, next) => {
  const { trackingNo, carrier, estimatedDelivery, originCountry, destinationCountry } = req.body;

  if (!trackingNo || trackingNo.trim().length < 5 || trackingNo.trim().length > 50) {
    return res.status(400).json({
      code: 400,
      message: '物流追踪号长度应在5-50个字符之间'
    });
  }

  if (!carrier || carrier.trim().length < 2 || carrier.trim().length > 50) {
    return res.status(400).json({
      code: 400,
      message: '承运商名称长度应在2-50个字符之间'
    });
  }

  if (estimatedDelivery && isNaN(Date.parse(estimatedDelivery))) {
    return res.status(400).json({
      code: 400,
      message: '预计送达时间格式不正确'
    });
  }

  if (!originCountry || !/^[A-Z]{2}$/.test(originCountry)) {
    return res.status(400).json({
      code: 400,
      message: '起运国必须是2位大写字母(ISO 3166-1)'
    });
  }

  if (!destinationCountry || !/^[A-Z]{2}$/.test(destinationCountry)) {
    return res.status(400).json({
      code: 400,
      message: '目的国必须是2位大写字母(ISO 3166-1)'
    });
  }

  next();
};

const validateTrackingUpdate = (req, res, next) => {
  const { status, location, details } = req.body;
  const validStatuses = ['pending', 'in_transit', 'arrived', 'customs', 'delivered', 'exception', 'returned'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      code: 400,
      message: '无效的物流状态'
    });
  }

  if (!location || location.trim().length < 2 || location.trim().length > 100) {
    return res.status(400).json({
      code: 400,
      message: '位置信息长度应在2-100个字符之间'
    });
  }

  if (details && details.trim().length > 500) {
    return res.status(400).json({
      code: 400,
      message: '详细说明不能超过500个字符'
    });
  }

  next();
};

const validateCategory = (req, res, next) => {
  const { translations } = req.body;

  if (!translations || typeof translations !== 'object') {
    return res.status(400).json({
      code: 400,
      message: '分类翻译信息不能为空'
    });
  }

  // 检查每个语言的翻译
  for (const [lang, data] of Object.entries(translations)) {
    // 检查名称
    if (!data.name || data.name.trim().length < 2 || data.name.trim().length > 50) {
      return res.status(400).json({
        code: 400,
        message: `${lang}语言的分类名称长度应在2-50个字符之间`
      });
    }

    // 检查描述（如果提供）
    if (data.description && data.description.trim().length > 500) {
      return res.status(400).json({
        code: 400,
        message: `${lang}语言的描述长度不能超过500个字符`
      });
    }
  }

  next();
};

module.exports = {
  validateUserCreate,
  validateUserUpdate,
  validateProduct,
  validateOrderStatus,
  validateLanguage,
  validateExchangeRate,
  validateProductTranslation,
  validateWarehouse,
  validateInventoryTransfer,
  validateCustomsStatus,
  validateTracking,
  validateTrackingUpdate,
  validateCategory
}; 