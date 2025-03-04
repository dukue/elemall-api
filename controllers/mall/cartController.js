const MallCartItem = require('../../models/MallCartItem');
const Product = require('../../models/Product');
const ProductTranslation = require('../../models/ProductTranslation');
const Language = require('../../models/Language');

// 添加商品到购物车
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    // 检查商品是否存在
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        code: 404,
        message: '商品不存在'
      });
    }

    // 检查商品是否已在购物车中
    let cartItem = await MallCartItem.findOne({
      where: { userId, productId }
    });

    if (cartItem) {
      // 如果商品已存在，更新数量
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // 如果商品不存在，创建新的购物车项
      cartItem = await MallCartItem.create({
        userId,
        productId,
        quantity
      });
    }

    res.status(200).json({
      code: 200,
      message: '添加成功',
      data: {
        id: cartItem.id,
        productId: cartItem.productId,
        quantity: cartItem.quantity
      }
    });
  } catch (error) {
    console.error('添加购物车失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

// 获取购物车列表
exports.getCartList = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // 获取默认语言
    const defaultLanguage = await Language.findOne({
      where: { isDefault: true }
    });

    // 获取购物车商品列表
    const cartItems = await MallCartItem.findAll({
      where: { userId },
      include: [{
        model: Product,
        as: 'product',
        include: [{
          model: ProductTranslation,
          as: 'ProductTranslations',
          where: { languageId: defaultLanguage.id },
          attributes: ['name']
        }]
      }]
    });

    // 计算总金额
    let totalAmount = 0;
    const items = cartItems.map(item => {
      const subtotal = Number(item.product.price) * item.quantity;
      totalAmount += subtotal;
      
      return {
        id: item.id,
        productId: item.productId,
        productName: item.product.ProductTranslations[0].name,
        productImage: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
        selected: item.selected
      };
    });

    res.status(200).json({
      code: 200,
      data: {
        total: items.length,
        totalAmount: Number(totalAmount.toFixed(2)),
        items
      }
    });
  } catch (error) {
    console.error('获取购物车列表失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

// 更新购物车商品数量
exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItemId = req.params.id;
    const { quantity } = req.body;

    // 检查购物车项是否存在
    const cartItem = await MallCartItem.findOne({
      where: { id: cartItemId, userId }
    });

    if (!cartItem) {
      return res.status(404).json({
        code: 404,
        message: '购物车商品不存在'
      });
    }

    // 更新数量
    await cartItem.update({ quantity });

    res.status(200).json({
      code: 200,
      message: '更新成功'
    });
  } catch (error) {
    console.error('更新购物车商品数量失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

// 删除购物车商品
exports.deleteCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItemId = req.params.id;

    // 检查购物车项是否存在
    const cartItem = await MallCartItem.findOne({
      where: { id: cartItemId, userId }
    });

    if (!cartItem) {
      return res.status(404).json({
        code: 404,
        message: '购物车商品不存在'
      });
    }

    // 删除购物车项
    await cartItem.destroy();

    res.status(200).json({
      code: 200,
      message: '删除成功'
    });
  } catch (error) {
    console.error('删除购物车商品失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
}; 