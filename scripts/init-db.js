const sequelize = require('../config/database');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const OrderProduct = require('../models/OrderProduct');
const Category = require('../models/Category');
const Language = require('../models/Language');
const ProductTranslation = require('../models/ProductTranslation');
const ExchangeRate = require('../models/ExchangeRate');
const Warehouse = require('../models/Warehouse');
const Inventory = require('../models/Inventory');
const InventoryTransaction = require('../models/InventoryTransaction');
const CustomsClearance = require('../models/CustomsClearance');
const CustomsDocument = require('../models/CustomsDocument');
const ShipmentTracking = require('../models/ShipmentTracking');
const TrackingHistory = require('../models/TrackingHistory');
const CategoryTranslation = require('../models/CategoryTranslation');
const MallUser = require('../models/MallUser');
const MallAddress = require('../models/MallAddress');
const MallCartItem = require('../models/MallCartItem');
const MallOrder = require('../models/MallOrder');
const MallOrderItem = require('../models/MallOrderItem');
const { generateOrderNo } = require('../utils/orderUtils');
const Sequelize = require('sequelize');

async function initDatabase() {
  try {
    // 同步所有模型到数据库
    await sequelize.sync({ force: true });
    
    console.log('Creating languages...');
    // 创建默认语言
    const languages = await Language.bulkCreate([
      { code: 'zh', name: '中文', isDefault: true },
      { code: 'en', name: 'English' },
      { code: 'ja', name: '日本語' }
    ]);
    console.log('Languages created:', languages.map(l => ({ id: l.id, code: l.code, isDefault: l.isDefault })));

    // 创建默认管理员用户
    await User.create({
      username: 'admin',
      password: '123456',
      email: 'admin@test.com',
      mobile: '13800138000',
      role: 'admin'
    });

    // 创建一些测试用户
    const testUsers = Array.from({ length: 10 }, (_, i) => ({
      username: `user${i + 1}`,
      password: '123456',
      email: `user${i + 1}@test.com`,
      mobile: `1380013800${i}`,
      role: 'user'
    }));

    await User.bulkCreate(testUsers);

    // 创建商品分类
    console.log('Creating categories...');
    const categories = await Category.bulkCreate([
      // 电子产品分类
      { 
        image: 'uploads/categories/electronics.jpg'
      },
      // 服装分类
      { 
        image: 'uploads/categories/clothing.jpg'
      },
      // 食品分类
      { 
        image: 'uploads/categories/food.jpg'
      },
      // 家居分类
      { 
        image: 'uploads/categories/home.jpg'
      }
    ]);

    // 为每个分类创建多语言数据
    const categoryNames = ['电子产品', '服装', '食品', '家居'];
    for (let i = 0; i < categories.length; i++) {
      console.log(`Creating translations for category ${categories[i].id}...`);
      await CategoryTranslation.bulkCreate([
        {
          categoryId: categories[i].id,
          languageId: languages[0].id, // 中文
          name: categoryNames[i],
          description: `${categoryNames[i]}分类的详细描述`
        },
        {
          categoryId: categories[i].id,
          languageId: languages[1].id, // 英文
          name: categoryNames[i] === '电子产品' ? 'Electronics' :
                categoryNames[i] === '服装' ? 'Clothing' :
                categoryNames[i] === '食品' ? 'Food' : 'Home',
          description: `Description for ${categoryNames[i]}`
        },
        {
          categoryId: categories[i].id,
          languageId: languages[2].id, // 日文
          name: categoryNames[i] === '电子产品' ? '電子製品' :
                categoryNames[i] === '服装' ? '衣類' :
                categoryNames[i] === '食品' ? '食品' : '家具',
          description: `${categoryNames[i]}の説明`
        }
      ]);
    }

    // 创建子分类
    const subCategories = await Category.bulkCreate([
      // 电子产品的子分类
      { 
        image: 'uploads/categories/phones.jpg'
      },
      { 
        image: 'uploads/categories/computers.jpg'
      },
      // 服装的子分类
      { 
        image: 'uploads/categories/mens.jpg'
      },
      { 
        image: 'uploads/categories/womens.jpg'
      }
    ]);

    // 创建测试商品数据
    const testProducts = Array.from({ length: 20 }, (_, i) => ({
      price: (Math.random() * 1000).toFixed(2),
      weight: (Math.random() * 10).toFixed(2),
      status: true,
      categoryId: categories[Math.floor(Math.random() * categories.length)].id,
      image: `uploads/products/product-${i + 1}.jpg`,  // 添加默认主图
      images: [  // 添加默认图片集
        `uploads/products/product-${i + 1}-1.jpg`,
        `uploads/products/product-${i + 1}-2.jpg`,
        `uploads/products/product-${i + 1}-3.jpg`
      ]
    }));

    const products = await Product.bulkCreate(testProducts);

    // 创建商品图片目录
    const fs = require('fs');
    const path = require('path');
    const uploadDir = path.join(__dirname, '..', 'uploads', 'products');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // 创建测试图片文件
    for (let i = 0; i < testProducts.length; i++) {
      // 创建空的图片文件
      fs.writeFileSync(path.join(__dirname, '..', testProducts[i].image), '');
      for (const imagePath of testProducts[i].images) {
        fs.writeFileSync(path.join(__dirname, '..', imagePath), '');
      }
    }

    // 为每个商品创建多语言数据
    for (const product of products) {
      await ProductTranslation.bulkCreate([
        {
          productId: product.id,
          languageId: languages[0].id, // 中文
          name: `商品${product.id}`,
          description: `这是商品${product.id}的详细描述`,
          specifications: {
            color: '红色',
            size: 'M',
            material: '棉'
          }
        },
        {
          productId: product.id,
          languageId: languages[1].id, // 英文
          name: `Product ${product.id}`,
          description: `This is product ${product.id} description`,
          specifications: {
            color: 'Red',
            size: 'M',
            material: 'Cotton'
          }
        },
        {
          productId: product.id,
          languageId: languages[2].id, // 日文
          name: `商品${product.id}`,
          description: `商品${product.id}の説明`,
          specifications: {
            color: '赤',
            size: 'M',
            material: '綿'
          }
        }
      ]);
    }

    // 创建测试订单数据
    const testOrders = Array.from({ length: 5 }, (_, i) => ({
      orderNo: `ORDER20240315000${i + 1}`,
      totalAmount: (Math.random() * 1000).toFixed(2),
      currency: ['CNY', 'USD', 'EUR', 'JPY'][Math.floor(Math.random() * 4)],
      status: 'pending',
      payMethod: ['alipay', 'wechat', 'bank'][Math.floor(Math.random() * 3)],
      receiver: `测试用户${i + 1}`,
      phone: `1380013800${i}`,
      address: `测试地址${i + 1}`,
      userId: i === 0 ? 1 : Math.floor(Math.random() * 10) + 2
    }));

    const orders = await Order.bulkCreate(testOrders);

    // 为每个订单添加商品
    for (const order of orders) {
      const randomProducts = await Product.findAll({
        order: sequelize.random(),
        limit: 2
      });

      for (const product of randomProducts) {
        await OrderProduct.create({
          OrderId: order.id,
          ProductId: product.id,
          quantity: Math.floor(Math.random() * 5) + 1,
          price: product.price
        });
      }
    }

    // 创建测试汇率数据
    const testRates = [
      { fromCurrency: 'USD', toCurrency: 'CNY', rate: 6.37 },
      { fromCurrency: 'EUR', toCurrency: 'CNY', rate: 7.45 },
      { fromCurrency: 'JPY', toCurrency: 'CNY', rate: 0.059 }
    ];

    for (const rate of testRates) {
      await ExchangeRate.create(rate);
      // 创建反向汇率
      await ExchangeRate.create({
        fromCurrency: rate.toCurrency,
        toCurrency: rate.fromCurrency,
        rate: 1 / rate.rate
      });
    }

    // 创建测试仓库数据
    const testWarehouses = [
      { code: 'CN001', name: '上海仓', location: '上海市浦东新区XX路XX号', country: 'CN', contact: '张三', phone: '13800138001' },
      { code: 'US001', name: 'LA Warehouse', location: 'XXX Street, Los Angeles, CA', country: 'US', contact: 'John', phone: '+1-123-456-7890' },
      { code: 'JP001', name: '東京倉庫', location: '東京都港区XX', country: 'JP', contact: '田中', phone: '+81-3-1234-5678' }
    ];

    const warehouses = await Warehouse.bulkCreate(testWarehouses);

    // 为每个商品创建初始库存
    for (const product of products) {
      for (const warehouse of warehouses) {
        const quantity = Math.floor(Math.random() * 100) + 1; // 确保数量至少为1
        
        await Inventory.create({
          productId: product.id,
          warehouseId: warehouse.id,
          quantity,
          safetyStock: 10
        });

        // 创建入库流水记录
        await InventoryTransaction.create({
          productId: product.id,
          toWarehouseId: warehouse.id,
          quantity, // 使用相同的数量
          type: 'in',
          reason: '初始库存',
          operatorId: 1 // 管理员ID
        });
      }
    }

    // 为每个订单创建清关记录和测试文件
    for (const order of orders) {
      const clearance = await CustomsClearance.create({
        orderId: order.id,
        status: 'pending',
        operatorId: 1
      });

      // 创建一些测试清关文件
      await CustomsDocument.create({
        clearanceId: clearance.id,
        type: 'invoice',
        name: '商业发票.pdf',
        path: 'uploads/customs/test-invoice.pdf',
        uploaderId: 1
      });

      await CustomsDocument.create({
        clearanceId: clearance.id,
        type: 'packing_list',
        name: '装箱单.pdf',
        path: 'uploads/customs/test-packing-list.pdf',
        uploaderId: 1
      });
    }

    // 为每个订单创建物流记录
    for (const order of orders) {
      const tracking = await ShipmentTracking.create({
        orderId: order.id,
        trackingNo: `TN${Date.now()}${Math.floor(Math.random() * 1000)}`,
        carrier: ['DHL', 'FedEx', 'UPS'][Math.floor(Math.random() * 3)],
        status: 'in_transit',
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        originCountry: 'CN',
        destinationCountry: ['US', 'GB', 'JP'][Math.floor(Math.random() * 3)],
        operatorId: 1
      });

      // 创建物流历史记录
      await TrackingHistory.create({
        trackingId: tracking.id,
        location: '上海',
        status: 'pending',
        details: '物流信息已创建',
        eventTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
        operatorId: 1
      });

      await TrackingHistory.create({
        trackingId: tracking.id,
        location: '上海浦东国际机场',
        status: 'in_transit',
        details: '包裹已发出',
        eventTime: new Date(),
        operatorId: 1
      });
    }

    console.log('Creating mall users...');
    const mallUsers = await MallUser.bulkCreate([
      {
        username: 'testuser',
        password: '123456', // 密码会在模型中自动加密
        email: 'test@example.com',
        mobile: '13800138000',
        status: true
      },
      {
        username: 'malluser1',
        password: '123456',
        email: 'mall1@example.com',
        mobile: '13800138001',
        status: true
      },
      {
        username: 'malluser2',
        password: '123456',
        email: 'mall2@example.com',
        mobile: '13800138002',
        status: true
      }
    ]);

    // 为测试用户创建收货地址
    console.log('Creating mall addresses...');
    await MallAddress.bulkCreate([
      {
        userId: mallUsers[0].id,
        receiverName: '张三',
        receiverPhone: '13800138000',
        province: '广东省',
        city: '深圳市',
        district: '南山区',
        detailAddress: '科技园路1号',
        isDefault: true
      },
      {
        userId: mallUsers[0].id,
        receiverName: '李四',
        receiverPhone: '13800138000',
        province: '广东省',
        city: '广州市',
        district: '天河区',
        detailAddress: '天河路2号',
        isDefault: false
      },
      {
        userId: mallUsers[1].id,
        receiverName: '王五',
        receiverPhone: '13800138001',
        province: '北京市',
        city: '北京市',
        district: '朝阳区',
        detailAddress: '建国路3号',
        isDefault: true
      }
    ]);

    // 为测试用户创建购物车数据
    console.log('Creating mall cart items...');
    await MallCartItem.bulkCreate([
      {
        userId: mallUsers[0].id,
        productId: products[0].id,
        quantity: 2,
        selected: true
      },
      {
        userId: mallUsers[0].id,
        productId: products[1].id,
        quantity: 1,
        selected: true
      },
      {
        userId: mallUsers[1].id,
        productId: products[2].id,
        quantity: 3,
        selected: true
      }
    ]);

    // 创建示例订单数据
    console.log('Creating sample mall orders...');
    const sampleOrders = await MallOrder.bulkCreate([
      {
        orderNo: generateOrderNo('MALL'),
        userId: mallUsers[0].id,
        totalAmount: 599.00,
        status: 'pending',
        payMethod: 'alipay',
        receiverName: '张三',
        receiverPhone: '13800138000',
        province: '广东省',
        city: '深圳市',
        district: '南山区',
        detailAddress: '科技园路1号',
        remark: '请尽快发货'
      },
      {
        orderNo: generateOrderNo('MALL'),
        userId: mallUsers[1].id,
        totalAmount: 299.00,
        status: 'paid',
        payMethod: 'wechat',
        payTime: new Date(),
        receiverName: '李四',
        receiverPhone: '13800138001',
        province: '北京市',
        city: '北京市',
        district: '朝阳区',
        detailAddress: '建国路3号',
        remark: '周末送货'
      }
    ]);

    // 创建示例订单商品数据
    console.log('Creating sample mall order items...');
    await MallOrderItem.bulkCreate([
      {
        orderId: sampleOrders[0].id,
        productId: products[0].id,
        productName: '示例商品1',
        productImage: 'uploads/products/product-1.jpg',
        price: 299.00,
        quantity: 1,
        subtotal: 299.00
      },
      {
        orderId: sampleOrders[0].id,
        productId: products[1].id,
        productName: '示例商品2',
        productImage: 'uploads/products/product-2.jpg',
        price: 300.00,
        quantity: 1,
        subtotal: 300.00
      },
      {
        orderId: sampleOrders[1].id,
        productId: products[2].id,
        productName: '示例商品3',
        productImage: 'uploads/products/product-3.jpg',
        price: 299.00,
        quantity: 1,
        subtotal: 299.00
      }
    ]);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

initDatabase();