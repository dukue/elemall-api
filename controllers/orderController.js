const { Op } = require('sequelize');
const Order = require('../models/Order');
const Product = require('../models/Product');
const OrderProduct = require('../models/OrderProduct');

exports.getOrders = async (req, res) => {
  try {
    const { query = '', startDate, endDate, pagenum = 1, pagesize = 10 } = req.query;
    const offset = (pagenum - 1) * pagesize;

    // 构建查询条件
    const whereClause = {};
    if (query) {
      whereClause.orderNo = { [Op.like]: `%${query}%` };
    }
    if (startDate && endDate) {
      whereClause.createTime = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    // 查询订单列表和总数
    const { count, rows } = await Order.findAndCountAll({
      where: whereClause,
      include: [{
        model: Product,
        through: {
          attributes: ['quantity', 'price']
        }
      }],
      offset: Number(offset),
      limit: Number(pagesize),
      order: [['createTime', 'DESC']]
    });

    // 格式化响应数据
    const orders = rows.map(order => ({
      id: order.id,
      orderNo: order.orderNo,
      createTime: order.createTime,
      totalAmount: order.totalAmount,
      status: order.status,
      payMethod: order.payMethod,
      receiver: order.receiver,
      phone: order.phone,
      address: order.address,
      products: order.Products.map(product => ({
        name: product.name,
        price: product.OrderProduct.price,
        quantity: product.OrderProduct.quantity
      }))
    }));

    res.json({
      code: 200,
      message: '获取订单列表成功',
      data: {
        total: count,
        orders
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({
        code: 404,
        message: '订单不存在'
      });
    }

    // 检查状态转换是否合法
    if (order.status === 'cancelled') {
      return res.status(400).json({
        code: 400,
        message: '已取消的订单不能更改状态'
      });
    }

    if (order.status === 'completed' && status !== 'cancelled') {
      return res.status(400).json({
        code: 400,
        message: '已完成的订单不能更改状态'
      });
    }

    await order.update({ status });

    res.json({
      code: 200,
      message: '订单状态更新成功',
      data: {
        id: order.id,
        orderNo: order.orderNo,
        status: order.status
      }
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.getOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;

    // 查询订单详情，包括关联的商品信息
    const order = await Order.findOne({
      where: { id },
      include: [{
        model: Product,
        through: {
          attributes: ['quantity', 'price']
        }
      }]
    });

    if (!order) {
      return res.status(404).json({
        code: 404,
        message: '订单不存在'
      });
    }

    // 检查权限（只有管理员或订单所属用户可以查看）
    const currentUser = req.user;
    if (currentUser.role !== 'admin' && currentUser.id !== order.userId) {
      return res.status(403).json({
        code: 403,
        message: '没有权限查看该订单'
      });
    }

    // 格式化订单数据
    const orderData = {
      id: order.id,
      orderNo: order.orderNo,
      createTime: order.createTime,
      updateTime: order.updateTime,
      totalAmount: order.totalAmount,
      status: order.status,
      payMethod: order.payMethod,
      receiver: order.receiver,
      phone: order.phone,
      address: order.address,
      products: order.Products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.OrderProduct.price,
        quantity: product.OrderProduct.quantity,
        subtotal: Number(product.OrderProduct.price) * product.OrderProduct.quantity
      }))
    };

    // 添加订单状态的中文描述
    const statusMap = {
      'pending': '待发货',
      'processing': '已发货',
      'completed': '已完成',
      'cancelled': '已取消'
    };
    orderData.statusText = statusMap[order.status] || order.status;

    // 添加支付方式的中文描述
    const payMethodMap = {
      'alipay': '支付宝',
      'wechat': '微信支付',
      'bank': '银行卡'
    };
    orderData.payMethodText = payMethodMap[order.payMethod] || order.payMethod;

    res.json({
      code: 200,
      message: '获取订单详情成功',
      data: orderData
    });
  } catch (error) {
    console.error('Get order detail error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
}; 