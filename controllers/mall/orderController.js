const MallOrder = require('../../models/MallOrder');
const MallOrderItem = require('../../models/MallOrderItem');
const MallAddress = require('../../models/MallAddress');
const Product = require('../../models/Product');
const ProductTranslation = require('../../models/ProductTranslation');
const Language = require('../../models/Language');
const sequelize = require('../../config/database');
const { 
  generateOrderNo, 
  ORDER_STATUS, 
  getOrderStatusText,
  calculateOrderTotal,
  formatAddress,
  canCancelOrder,
  canConfirmOrder
} = require('../../utils/orderUtils');

// 创建订单
exports.createOrder = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const userId = req.user.id;
    const { addressId, items, remark } = req.body;

    // 验证地址
    const address = await MallAddress.findOne({
      where: { id: addressId, userId }
    });

    if (!address) {
      return res.status(400).json({
        code: 400,
        message: '收货地址不存在'
      });
    }

    // 生成订单号
    const orderNo = generateOrderNo('MALL');
    
    // 计算总金额并验证商品
    const orderItems = [];
    
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        await transaction.rollback();
        return res.status(400).json({
          code: 400,
          message: `商品ID ${item.productId} 不存在`
        });
      }

      // 获取商品翻译信息
      const productTranslation = await ProductTranslation.findOne({
        where: {
          productId: item.productId,
          languageId: 1 // 默认使用中文
        }
      });

      if (!productTranslation) {
        await transaction.rollback();
        return res.status(400).json({
          code: 400,
          message: `商品ID ${item.productId} 的翻译信息不存在`
        });
      }

      const subtotal = Number(product.price) * item.quantity;
      orderItems.push({
        productId: product.id,
        productName: productTranslation.name,
        productImage: product.image,
        price: product.price,
        quantity: item.quantity,
        subtotal
      });
    }

    const totalAmount = calculateOrderTotal(orderItems);

    // 创建订单
    const order = await MallOrder.create({
      orderNo,
      userId,
      totalAmount,
      status: ORDER_STATUS.PENDING,
      receiverName: address.receiverName,
      receiverPhone: address.receiverPhone,
      province: address.province,
      city: address.city,
      district: address.district,
      detailAddress: address.detailAddress,
      remark
    }, { transaction });

    // 创建订单商品记录
    await MallOrderItem.bulkCreate(
      orderItems.map(item => ({
        orderId: order.id,
        productId: item.productId,
        productName: item.productName,
        productImage: item.productImage,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.subtotal
      })),
      { transaction }
    );

    await transaction.commit();

    res.status(200).json({
      code: 200,
      message: '创建成功',
      data: {
        orderId: order.orderNo,
        totalAmount: order.totalAmount,
        status: getOrderStatusText(order.status)
      }
    });
  } catch (error) {
    await transaction.rollback();
    console.error('创建订单失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

// 获取订单列表
exports.getOrderList = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status = 'all', page = 1, pageSize = 10 } = req.query;
    
    const where = { userId };
    if (status !== 'all') {
      where.status = status;
    }

    const { count, rows: orders } = await MallOrder.findAndCountAll({
      where,
      include: [{
        model: MallOrderItem,
        as: 'items'
      }],
      order: [['createTime', 'DESC']],
      offset: (page - 1) * pageSize,
      limit: pageSize
    });

    res.status(200).json({
      code: 200,
      data: {
        total: count,
        list: orders.map(order => ({
          orderId: order.orderNo,
          totalAmount: order.totalAmount,
          status: order.status,
          statusText: getOrderStatusText(order.status),
          createTime: order.createTime,
          items: order.items.map(item => ({
            productId: item.productId,
            productName: item.productName,
            productImage: item.productImage,
            price: item.price,
            quantity: item.quantity
          }))
        }))
      }
    });
  } catch (error) {
    console.error('获取订单列表失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

// 获取订单详情
exports.getOrderDetail = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;

    const order = await MallOrder.findOne({
      where: { orderNo: orderId, userId },
      include: [{
        model: MallOrderItem,
        as: 'items'
      }]
    });

    if (!order) {
      return res.status(404).json({
        code: 404,
        message: '订单不存在'
      });
    }

    res.status(200).json({
      code: 200,
      data: {
        orderId: order.orderNo,
        totalAmount: order.totalAmount,
        status: order.status,
        statusText: getOrderStatusText(order.status),
        createTime: order.createTime,
        address: {
          receiverName: order.receiverName,
          receiverPhone: order.receiverPhone,
          fullAddress: `${order.province}${order.city}${order.district}${order.detailAddress}`
        },
        items: order.items.map(item => ({
          productId: item.productId,
          productName: item.productName,
          productImage: item.productImage,
          price: item.price,
          quantity: item.quantity
        })),
        remark: order.remark
      }
    });
  } catch (error) {
    console.error('获取订单详情失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

// 取消订单
exports.cancelOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;

    const order = await MallOrder.findOne({
      where: { orderNo: orderId, userId }
    });

    if (!order) {
      return res.status(404).json({
        code: 404,
        message: '订单不存在'
      });
    }

    if (!canCancelOrder(order.status)) {
      return res.status(400).json({
        code: 400,
        message: '当前订单状态不可取消'
      });
    }

    await order.update({ status: ORDER_STATUS.CANCELLED });

    res.status(200).json({
      code: 200,
      message: '订单已取消'
    });
  } catch (error) {
    console.error('取消订单失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

// 确认收货
exports.confirmOrder = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const userId = req.user.id;
    const { orderId } = req.params;

    const order = await MallOrder.findOne({
      where: { orderNo: orderId, userId },
      include: [{
        model: MallOrderItem,
        as: 'items'
      }]
    });

    if (!order) {
      return res.status(404).json({
        code: 404,
        message: '订单不存在'
      });
    }

    if (!canConfirmOrder(order.status)) {
      return res.status(400).json({
        code: 400,
        message: '当前订单状态不可确认收货'
      });
    }

    // 更新订单状态
    await order.update({ 
      status: ORDER_STATUS.COMPLETED,
      completeTime: new Date()
    }, { transaction });

    // 更新商品销量
    for (const item of order.items) {
      await Product.increment(
        { sales: item.quantity },
        { 
          where: { id: item.productId },
          transaction
        }
      );
    }

    await transaction.commit();

    res.status(200).json({
      code: 200,
      message: '确认收货成功'
    });
  } catch (error) {
    await transaction.rollback();
    console.error('确认收货失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
}; 