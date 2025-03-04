const moment = require('moment');

// 生成订单号
exports.generateOrderNo = (prefix = '') => {
  const date = moment().format('YYYYMMDD');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}${date}${random}`;
};

// 订单状态枚举
exports.ORDER_STATUS = {
  PENDING: 'pending',    // 待付款
  PAID: 'paid',         // 已付款
  SHIPPED: 'shipped',   // 已发货
  COMPLETED: 'completed', // 已完成
  CANCELLED: 'cancelled' // 已取消
};

// 支付方式枚举
exports.PAYMENT_METHODS = {
  ALIPAY: 'alipay',
  WECHAT: 'wechat',
  BANK: 'bank'
};

// 获取订单状态文本
exports.getOrderStatusText = (status) => {
  const statusMap = {
    [exports.ORDER_STATUS.PENDING]: '待付款',
    [exports.ORDER_STATUS.PAID]: '待发货',
    [exports.ORDER_STATUS.SHIPPED]: '已发货',
    [exports.ORDER_STATUS.COMPLETED]: '已完成',
    [exports.ORDER_STATUS.CANCELLED]: '已取消'
  };
  return statusMap[status] || '未知状态';
};

// 获取支付方式文本
exports.getPaymentMethodText = (method) => {
  const methodMap = {
    [exports.PAYMENT_METHODS.ALIPAY]: '支付宝',
    [exports.PAYMENT_METHODS.WECHAT]: '微信支付',
    [exports.PAYMENT_METHODS.BANK]: '银行卡'
  };
  return methodMap[method] || '未知方式';
};

// 计算订单总价
exports.calculateOrderTotal = (items) => {
  return items.reduce((total, item) => {
    return total + (Number(item.price) * item.quantity);
  }, 0);
};

// 格式化地址
exports.formatAddress = (address) => {
  return `${address.province}${address.city}${address.district}${address.detailAddress}`;
};

// 检查订单状态是否可以被取消
exports.canCancelOrder = (status) => {
  return status === exports.ORDER_STATUS.PENDING || status === exports.ORDER_STATUS.PAID;
};

// 检查订单是否可以确认收货
exports.canConfirmOrder = (status) => {
  return status === exports.ORDER_STATUS.SHIPPED;
}; 