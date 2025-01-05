const { Op } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('../models/Product');
const Category = require('../models/Category');
const CategoryTranslation = require('../models/CategoryTranslation');
const Language = require('../models/Language');
const Order = require('../models/Order');
const User = require('../models/User');
const ShipmentTracking = require('../models/ShipmentTracking');
const ExchangeRate = require('../models/ExchangeRate');
const Inventory = require('../models/Inventory');

exports.getOverview = async (req, res) => {
  try {
    // 获取当前时间和30天前的时间
    const now = new Date();
    const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

    // 获取总销售额
    const totalSales = await Order.sum('totalAmount', {
      where: {
        status: {
          [Op.ne]: 'cancelled'
        }
      }
    });

    // 获取总订单数
    const totalOrders = await Order.count();

    // 获取总商品数
    const totalProducts = await Product.count({
      where: {
        status: true
      }
    });

    // 获取总用户数
    const totalUsers = await User.count();

    // 计算趋势（与30天前相比）
    const previousSales = await Order.sum('totalAmount', {
      where: {
        createTime: {
          [Op.lt]: thirtyDaysAgo
        },
        status: {
          [Op.ne]: 'cancelled'
        }
      }
    });

    const previousOrders = await Order.count({
      where: {
        createTime: {
          [Op.lt]: thirtyDaysAgo
        }
      }
    });

    const previousProducts = await Product.count({
      where: {
        createTime: {
          [Op.lt]: thirtyDaysAgo
        },
        status: true
      }
    });

    const previousUsers = await User.count({
      where: {
        createTime: {
          [Op.lt]: thirtyDaysAgo
        }
      }
    });

    // 计算增长率
    const calculateGrowth = (current, previous) => {
      if (!previous) return 100;
      return Number(((current - previous) / previous * 100).toFixed(1));
    };

    res.json({
      code: 200,
      message: '获取概览数据成功',
      data: {
        totalSales: totalSales || 0,
        totalOrders,
        totalProducts,
        totalUsers,
        trends: {
          sales: calculateGrowth(totalSales, previousSales),
          orders: calculateGrowth(totalOrders, previousOrders),
          products: calculateGrowth(totalProducts, previousProducts),
          users: calculateGrowth(totalUsers, previousUsers)
        }
      }
    });
  } catch (error) {
    console.error('Get overview error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.getSalesTrend = async (req, res) => {
  try {
    const { range = 'week' } = req.query;
    let startDate, endDate, format, labels;

    // 设置时间范围和格式化
    switch (range) {
      case 'week':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 6);
        format = '%Y-%m-%d';
        labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        break;
      case 'month':
        startDate = new Date();
        startDate.setDate(1);
        format = '%Y-%m-%d';
        labels = Array.from({ length: 31 }, (_, i) => `${i + 1}日`);
        break;
      case 'year':
        startDate = new Date();
        startDate.setMonth(0, 1);
        format = '%Y-%m';
        labels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        break;
      default:
        return res.status(400).json({
          code: 400,
          message: '无效的时间范围'
        });
    }

    // 查询销售数据
    const sales = await Order.findAll({
      attributes: [
        [sequelize.fn('DATE_FORMAT', sequelize.col('createTime'), format), 'date'],
        [sequelize.fn('SUM', sequelize.col('totalAmount')), 'amount']
      ],
      where: {
        createTime: {
          [Op.gte]: startDate
        },
        status: {
          [Op.ne]: 'cancelled'
        }
      },
      group: [sequelize.fn('DATE_FORMAT', sequelize.col('createTime'), format)],
      order: [[sequelize.col('date'), 'ASC']]
    });

    // 格式化数据
    const salesMap = new Map(sales.map(sale => [
      sale.getDataValue('date'),
      Number(sale.getDataValue('amount'))
    ]));

    // 填充数据
    const series = labels.map(() => 0);
    salesMap.forEach((value, date) => {
      const index = range === 'week' ? new Date(date).getDay() : 
                   range === 'month' ? new Date(date).getDate() - 1 :
                   new Date(date).getMonth();
      series[index] = value;
    });

    res.json({
      code: 200,
      message: '获取销售趋势成功',
      data: {
        xAxis: labels,
        series
      }
    });
  } catch (error) {
    console.error('Get sales trend error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.getCategoryStats = async (req, res) => {
  try {
    const { lang = 'zh' } = req.query;

    // 获取指定语言
    const language = await Language.findOne({
      where: { code: lang }
    });

    if (!language) {
      return res.status(400).json({
        code: 400,
        message: '不支持的语言代码'
      });
    }

    const stats = await Category.findAll({
      attributes: [
        'id',
        [sequelize.col('CategoryTranslations.name'), 'name'],
        [sequelize.fn('COUNT', sequelize.col('Products.id')), 'value']
      ],
      include: [
        {
          model: CategoryTranslation,
          attributes: [],
          where: { languageId: language.id },
          required: true
        },
        {
          model: Product,
          attributes: [],
          required: false,
          where: {
            status: true
          }
        }
      ],
      group: ['Category.id', 'CategoryTranslations.name'],
      order: [[sequelize.fn('COUNT', sequelize.col('Products.id')), 'DESC']]
    });

    // 格式化数据
    const categories = stats.map(stat => ({
      id: stat.id,
      name: stat.get('name'),
      value: Number(stat.get('value'))
    }));

    // 获取未分类商品数量
    const uncategorizedCount = await Product.count({
      where: {
        categoryId: null,
        status: true
      }
    });

    // 如果有未分类商品，添加"其他"类别
    if (uncategorizedCount > 0) {
      categories.push({
        id: null,
        name: '未分类',
        value: uncategorizedCount
      });
    }

    res.json({
      code: 200,
      message: '获取商品分类统计成功',
      data: categories
    });
  } catch (error) {
    console.error('Get category stats error:', error);
    res.status(500).json({
      code: 500,
      message: error.message || '服务器错误'
    });
  }
};

exports.getPaymentStats = async (req, res) => {
  try {
    const stats = await Order.findAll({
      attributes: [
        ['payMethod', 'name'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'value']
      ],
      where: {
        status: {
          [Op.ne]: 'cancelled'
        }
      },
      group: ['payMethod'],
      order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']]
    });

    // 格式化数据
    const payments = stats.map(stat => ({
      name: formatPaymentMethod(stat.getDataValue('name')),
      value: Number(stat.getDataValue('value'))
    }));

    res.json({
      code: 200,
      message: '获取支付方式统计成功',
      data: payments
    });
  } catch (error) {
    console.error('Get payment stats error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.getInternationalSales = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    // 构建时间范围查询条件
    const whereClause = {};
    if (startDate && endDate) {
      whereClause.createTime = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    // 查询国内外订单数据
    const domesticSales = await Order.findAll({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('totalAmount')), 'amount'],
        [sequelize.fn('COUNT', sequelize.col('Order.id')), 'count']
      ],
      where: {
        ...whereClause,
        '$ShipmentTracking.destinationCountry$': 'CN'
      },
      include: [{
        model: ShipmentTracking,
        attributes: []
      }],
      raw: true
    });

    const internationalSales = await Order.findAll({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('totalAmount')), 'amount'],
        [sequelize.fn('COUNT', sequelize.col('Order.id')), 'count']
      ],
      where: {
        ...whereClause,
        '$ShipmentTracking.destinationCountry$': {
          [Op.ne]: 'CN'
        }
      },
      include: [{
        model: ShipmentTracking,
        attributes: []
      }],
      raw: true
    });

    // 计算同比增长
    const lastYearStart = new Date();
    lastYearStart.setFullYear(lastYearStart.getFullYear() - 1);
    
    const lastYearInternational = await Order.count({
      where: {
        createTime: {
          [Op.gte]: lastYearStart
        },
        '$ShipmentTracking.destinationCountry$': {
          [Op.ne]: 'CN'
        }
      },
      include: [{
        model: ShipmentTracking,
        attributes: []
      }]
    });

    res.json({
      code: 200,
      message: '获取国际销售数据成功',
      data: {
        domestic: {
          amount: Number(domesticSales[0].amount) || 0,
          count: Number(domesticSales[0].count) || 0
        },
        international: {
          amount: Number(internationalSales[0].amount) || 0,
          count: Number(internationalSales[0].count) || 0,
          yearOverYearGrowth: lastYearInternational ? 
            ((Number(internationalSales[0].count) - lastYearInternational) / lastYearInternational * 100).toFixed(2) : 
            100
        }
      }
    });
  } catch (error) {
    console.error('Get international sales error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.getSalesByCountry = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    // 构建时间范围查询条件
    const whereClause = {};
    if (startDate && endDate) {
      whereClause.createTime = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    // 按国家统计销售数据
    const salesByCountry = await Order.findAll({
      attributes: [
        [sequelize.col('ShipmentTracking.destinationCountry'), 'country'],
        [sequelize.fn('COUNT', sequelize.col('Order.id')), 'orderCount'],
        [sequelize.fn('SUM', sequelize.col('Order.totalAmount')), 'totalAmount']
      ],
      include: [{
        model: ShipmentTracking,
        attributes: []
      }],
      where: whereClause,
      group: ['ShipmentTracking.destinationCountry'],
      order: [[sequelize.fn('COUNT', sequelize.col('Order.id')), 'DESC']]
    });

    // 获取国家名称映射
    const countryMap = {
      'CN': '中国',
      'US': '美国',
      'GB': '英国',
      'JP': '日本',
      'DE': '德国',
      // ... 添加更多国家
    };

    const formattedData = salesByCountry.map(item => ({
      country: item.get('country'),
      countryName: countryMap[item.get('country')] || item.get('country'),
      orderCount: Number(item.get('orderCount')),
      totalAmount: Number(item.get('totalAmount')),
      percentage: 0 // 将在下面计算
    }));

    // 计算百分比
    const totalOrders = formattedData.reduce((sum, item) => sum + item.orderCount, 0);
    formattedData.forEach(item => {
      item.percentage = Number(((item.orderCount / totalOrders) * 100).toFixed(2));
    });

    res.json({
      code: 200,
      message: '获取各国销售数据成功',
      data: formattedData
    });
  } catch (error) {
    console.error('Get sales by country error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.getSalesByCurrency = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    // 构建时间范围查询条件
    const whereClause = {};
    if (startDate && endDate) {
      whereClause.createTime = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    // 获取所有汇率
    const exchangeRates = await ExchangeRate.findAll({
      where: {
        toCurrency: 'CNY',
        isActive: true
      }
    });

    // 创建汇率映射
    const rateMap = {};
    exchangeRates.forEach(rate => {
      rateMap[rate.fromCurrency] = rate.rate;
    });

    // 按币种统计销售数据
    const salesByCurrency = await Order.findAll({
      attributes: [
        ['currency', 'currency'],  // 明确指定列名
        [sequelize.fn('COUNT', sequelize.col('Order.id')), 'orderCount'],
        [sequelize.fn('SUM', sequelize.col('totalAmount')), 'totalAmount']
      ],
      where: {
        ...whereClause,
        status: {
          [Op.ne]: 'cancelled'  // 排除已取消的订单
        }
      },
      group: ['currency'],
      order: [[sequelize.fn('SUM', sequelize.col('totalAmount')), 'DESC']],
      raw: true  // 返回纯 JSON 结果
    });

    // 格式化数据并转换为人民币
    const formattedData = salesByCurrency.map(item => {
      const currency = item.currency;
      const totalAmount = Number(item.totalAmount);
      const rate = rateMap[currency] || 1;

      return {
        currency,
        orderCount: Number(item.orderCount),
        totalAmount,
        totalAmountCNY: Number((totalAmount * rate).toFixed(2))
      };
    });

    res.json({
      code: 200,
      message: '获取各币种销售数据成功',
      data: formattedData
    });
  } catch (error) {
    console.error('Get sales by currency error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.getLogisticsCost = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    // 构建时间范围查询条件
    const whereClause = {};
    if (startDate && endDate) {
      whereClause.createTime = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    // 按目的地国家和承运商统计物流成本
    const costStats = await ShipmentTracking.findAll({
      attributes: [
        'destinationCountry',
        'carrier',
        [sequelize.fn('COUNT', sequelize.col('ShipmentTracking.id')), 'shipmentCount'],
        [sequelize.fn('AVG', sequelize.col('Order.totalAmount')), 'avgCost']
      ],
      include: [{
        model: Order,
        attributes: []
      }],
      where: whereClause,
      group: ['destinationCountry', 'carrier'],
      order: [
        ['destinationCountry', 'ASC'],
        ['carrier', 'ASC']
      ],
      raw: true
    });

    // 格式化数据
    const formattedData = costStats.map(stat => ({
      country: stat.destinationCountry,
      carrier: stat.carrier,
      shipmentCount: Number(stat.shipmentCount),
      avgCost: Number(Number(stat.avgCost).toFixed(2))
    }));

    res.json({
      code: 200,
      message: '获取物流成本统计成功',
      data: formattedData
    });
  } catch (error) {
    console.error('Get logistics cost error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.getLogisticsTime = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    // 构建时间范围查询条件
    const whereClause = {};
    if (startDate && endDate) {
      whereClause.createTime = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    // 按目的地国家和承运商统计物流时效
    const timeStats = await ShipmentTracking.findAll({
      attributes: [
        'destinationCountry',
        'carrier',
        [sequelize.fn('COUNT', sequelize.col('ShipmentTracking.id')), 'shipmentCount'],
        [sequelize.fn('AVG', 
          sequelize.fn('TIMESTAMPDIFF', 
            sequelize.literal('DAY'), 
            sequelize.col('createTime'), 
            sequelize.col('estimatedDelivery')
          )
        ), 'avgDeliveryDays']
      ],
      where: {
        ...whereClause,
        status: {
          [Op.in]: ['delivered', 'completed']
        }
      },
      group: ['destinationCountry', 'carrier'],
      order: [
        ['destinationCountry', 'ASC'],
        ['carrier', 'ASC']
      ],
      raw: true
    });

    // 格式化数据
    const formattedData = timeStats.map(stat => ({
      country: stat.destinationCountry,
      carrier: stat.carrier,
      shipmentCount: Number(stat.shipmentCount),
      avgDeliveryDays: Number(Number(stat.avgDeliveryDays).toFixed(1))
    }));

    res.json({
      code: 200,
      message: '获取物流时效统计成功',
      data: formattedData
    });
  } catch (error) {
    console.error('Get logistics time error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.getCarrierPerformance = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    // 构建时间范围查询条件
    const whereClause = {};
    if (startDate && endDate) {
      whereClause.createTime = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    // 获取承运商绩效统计
    const performanceStats = await ShipmentTracking.findAll({
      attributes: [
        'carrier',
        [sequelize.fn('COUNT', sequelize.col('id')), 'totalShipments'],
        [sequelize.literal(`SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END)`), 'deliveredCount'],
        [sequelize.literal(`SUM(CASE WHEN status = 'exception' THEN 1 ELSE 0 END)`), 'exceptionCount'],
        [sequelize.literal(`SUM(CASE WHEN status = 'returned' THEN 1 ELSE 0 END)`), 'returnedCount']
      ],
      where: whereClause,
      group: ['carrier'],
      raw: true
    });

    // 格式化数据并计算比率
    const formattedData = performanceStats.map(stat => {
      const totalShipments = Number(stat.totalShipments);
      return {
        carrier: stat.carrier,
        totalShipments,
        deliveredCount: Number(stat.deliveredCount),
        exceptionCount: Number(stat.exceptionCount),
        returnedCount: Number(stat.returnedCount),
        deliveryRate: Number((stat.deliveredCount / totalShipments * 100).toFixed(2)),
        exceptionRate: Number((stat.exceptionCount / totalShipments * 100).toFixed(2)),
        returnRate: Number((stat.returnedCount / totalShipments * 100).toFixed(2))
      };
    });

    res.json({
      code: 200,
      message: '获取承运商绩效统计成功',
      data: formattedData
    });
  } catch (error) {
    console.error('Get carrier performance error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.getCategoryStatistics = async (req, res) => {
  try {
    const statistics = await Category.findAll({
      attributes: [
        'id',
        [sequelize.fn('COUNT', sequelize.col('Products.id')), 'productCount'],
        [sequelize.fn('SUM', sequelize.col('Products.price')), 'totalValue'],
        [sequelize.fn('AVG', sequelize.col('Products.price')), 'averagePrice'],
        [sequelize.fn('SUM', sequelize.col('Products->Inventories.quantity')), 'totalStock']
      ],
      include: [
        {
          model: Product,
          attributes: [],
          required: false,
          include: [{
            model: Inventory,
            attributes: [],
            required: false
          }]
        },
        {
          model: CategoryTranslation,
          where: { languageId: 1 },
          attributes: ['name'],
          required: true
        }
      ],
      group: [
        'Category.id',
        'CategoryTranslations.id',
        'CategoryTranslations.name'
      ],
      order: [[sequelize.fn('COUNT', sequelize.col('Products.id')), 'DESC']]
    });

    // 格式化响应数据
    const formattedStats = statistics.map(category => ({
      id: category.id,
      name: category.CategoryTranslations[0].name,
      productCount: parseInt(category.dataValues.productCount) || 0,
      totalValue: parseFloat(category.dataValues.totalValue) || 0,
      averagePrice: parseFloat(category.dataValues.averagePrice) || 0,
      totalStock: parseInt(category.dataValues.totalStock) || 0
    }));

    res.json({
      code: 200,
      message: '获取分类统计数据成功',
      data: formattedStats
    });
  } catch (error) {
    console.error('Get category statistics error:', error);
    res.status(500).json({
      code: 500,
      message: error.message || '服务器错误'
    });
  }
};

// 支付方式格式化
const formatPaymentMethod = (method) => {
  const methodMap = {
    'alipay': '支付宝',
    'wechat': '微信支付',
    'bank': '银行卡'
  };
  return methodMap[method] || method;
}; 