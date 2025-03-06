const { Op, fn, col, literal } = require('sequelize');
const sequelize = require('../../config/database');
const Product = require('../../models/Product');
const ProductTranslation = require('../../models/ProductTranslation');
const Category = require('../../models/Category');
const CategoryTranslation = require('../../models/CategoryTranslation');
const Language = require('../../models/Language');
const Inventory = require('../../models/Inventory');
const Warehouse = require('../../models/Warehouse');

/**
 * 获取商品列表
 * @param {Object} req - 请求对象
 * @param {Object} req.query - 查询参数
 * @param {string} [req.query.category] - 分类ID
 * @param {string} [req.query.keyword] - 搜索关键词
 * @param {number} [req.query.page=1] - 页码
 * @param {number} [req.query.pageSize=10] - 每页数量
 * @param {string} [req.query.sort='createTime_desc'] - 排序方式：price_asc/price_desc/sales_desc/createTime_desc
 * @param {string} [req.query.lang='zh'] - 语言代码
 * @param {Object} res - 响应对象
 */
exports.getProducts = async (req, res) => {
  try {
    const { 
      category,
      keyword,
      page = 1, 
      pageSize = 10,
      sort = 'createTime_desc',
      lang = 'zh'  // 默认中文
    } = req.query;

    const offset = (page - 1) * pageSize;

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

    // 构建查询条件
    const whereClause = {
      status: true  // 只查询上架商品
    };

    // 如果指定了分类ID，验证分类是否存在
    if (category) {
      const categoryExists = await Category.findByPk(category);
      if (!categoryExists) {
        return res.status(400).json({
          code: 400,
          message: '指定的分类不存在'
        });
      }
    }

    // 构建排序条件
    let order = [];
    switch (sort) {
      case 'price_asc':
        order.push(['price', 'ASC']);
        break;
      case 'price_desc':
        order.push(['price', 'DESC']);
        break;
      case 'sales_desc':
        order.push(['sales', 'DESC']);
        break;
      default:
        order.push(['createTime', 'DESC']);
    }

    // 先查询符合条件的商品ID列表
    const productIds = await Product.findAll({
      attributes: ['id'],
      where: whereClause,
      include: [
        {
          model: ProductTranslation,
          where: {
            languageId: language.id,
            ...(keyword && {
              [Op.or]: [
                { name: { [Op.like]: `%${keyword}%` } },
                { description: { [Op.like]: `%${keyword}%` } }
              ]
            })
          },
          required: true
        },
        {
          model: Category,
          where: category ? { id: category } : {},
          required: category ? true : false
        }
      ]
    }).then(results => results.map(r => r.id));

    // 如果没有找到商品，直接返回空列表
    if (productIds.length === 0) {
      return res.json({
        code: 200,
        data: {
          total: 0,
          list: []
        }
      });
    }

    // 查询商品详细信息
    const products = await Product.findAll({
      where: {
        id: { [Op.in]: productIds }
      },
      include: [
        {
          model: ProductTranslation,
          where: { languageId: language.id },
          required: true
        },
        {
          model: Category,
          include: [{
            model: CategoryTranslation,
            where: { languageId: language.id },
            required: false
          }]
        }
      ],
      order,
      offset: Number(offset),
      limit: Number(pageSize)
    });

    // 查询商品库存
    const inventories = await Inventory.findAll({
      attributes: [
        'productId',
        [fn('SUM', col('quantity')), 'totalStock']
      ],
      where: {
        productId: { [Op.in]: productIds }
      },
      group: ['productId']
    });

    // 创建库存映射
    const stockMap = inventories.reduce((map, inv) => {
      map[inv.productId] = inv.get('totalStock') || 0;
      return map;
    }, {});

    // 格式化响应数据
    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.ProductTranslations[0].name,
      description: product.ProductTranslations[0].description,
      price: product.price,
      image: product.image,
      sales: product.sales || 0,
      stock: stockMap[product.id] || 0,
      category: product.Category ? {
        id: product.Category.id,
        name: product.Category.CategoryTranslations[0]?.name
      } : null
    }));

    res.json({
      code: 200,
      data: {
        total: productIds.length,
        list: formattedProducts
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      code: 500,
      message: error.message || '服务器错误'
    });
  }
};

/**
 * 获取商品详情
 * @param {Object} req
 * @param {Object} res
 */
exports.getProductDetail = async (req, res) => {
  try {
    const { id } = req.params;
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

    // 查询商品详情
    const product = await Product.findOne({
      where: { 
        id,
        status: true  // 只能查看上架商品
      },
      include: [
        {
          model: ProductTranslation,
          where: { languageId: language.id },
          required: true
        },
        {
          model: Category,
          include: [{
            model: CategoryTranslation,
            where: { languageId: language.id },
            required: false
          }]
        },
        {
          model: Inventory,
          include: [Warehouse],
          required: false
        }
      ]
    });

    if (!product) {
      return res.status(404).json({
        code: 404,
        message: '商品不存在或已下架'
      });
    }

    // 计算总库存
    const totalStock = product.Inventories.reduce((sum, inv) => sum + inv.quantity, 0);

    // 格式化响应数据
    const formattedProduct = {
      id: product.id,
      name: product.ProductTranslations[0].name,
      description: product.ProductTranslations[0].description,
      price: product.price,
      images: product.images || [product.image],
      sales: product.sales || 0,
      stock: totalStock,
      category: product.Category ? {
        id: product.Category.id,
        name: product.Category.CategoryTranslations[0]?.name
      } : null,
      specifications: product.ProductTranslations[0].specifications,
      details: product.ProductTranslations[0].description,
      // 库存信息
      warehouses: product.Inventories.map(inv => ({
        id: inv.Warehouse.id,
        name: inv.Warehouse.name,
        stock: inv.quantity
      }))
    };

    res.json({
      code: 200,
      data: formattedProduct
    });
  } catch (error) {
    console.error('Get product detail error:', error);
    res.status(500).json({
      code: 500,
      message: error.message || '服务器错误'
    });
  }
};
