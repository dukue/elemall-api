const { Product, ProductTranslation, Category, CategoryTranslation } = require('../../models/Product');
const { Op } = require('sequelize');

exports.getProducts = async (req, res) => {
  try {
    const {
      categoryId,
      query,
      sort = 'new',
      minPrice,
      maxPrice,
      pagenum = 1,
      pagesize = 10,
      lang = 'zh'
    } = req.query;

    // 构建查询条件
    const where = {};
    if (categoryId) {
      where.categoryId = categoryId;
    }
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = minPrice;
      if (maxPrice) where.price[Op.lte] = maxPrice;
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
      case 'new':
        order.push(['createTime', 'DESC']);
        break;
    }

    // 查询商品
    const { count, rows } = await Product.findAndCountAll({
      where,
      include: [
        {
          model: ProductTranslation,
          where: { 
            languageCode: lang,
            ...(query && {
              [Op.or]: [
                { name: { [Op.like]: `%${query}%` } },
                { description: { [Op.like]: `%${query}%` } }
              ]
            })
          },
          attributes: ['name', 'description']
        }
      ],
      order,
      offset: (pagenum - 1) * pagesize,
      limit: pagesize
    });

    // 格式化返回数据
    const products = rows.map(product => ({
      id: product.id,
      name: product.ProductTranslations[0].name,
      price: product.price,
      originalPrice: product.originalPrice,
      description: product.ProductTranslations[0].description,
      mainImage: product.mainImage,
      images: product.images,
      sales: product.sales,
      rating: product.rating,
      reviewCount: product.reviewCount
    }));

    res.json({
      code: 200,
      message: '获取商品列表成功',
      data: {
        total: count,
        products
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.getProductDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { lang = 'zh' } = req.query;

    const product = await Product.findByPk(id, {
      include: [
        {
          model: ProductTranslation,
          where: { languageCode: lang },
          attributes: ['name', 'description']
        },
        {
          model: Category,
          include: [
            {
              model: CategoryTranslation,
              where: { languageCode: lang },
              attributes: ['name']
            }
          ]
        }
      ]
    });

    if (!product) {
      return res.status(404).json({
        code: 404,
        message: '商品不存在'
      });
    }

    // 格式化返回数据
    const formattedProduct = {
      id: product.id,
      name: product.ProductTranslations[0].name,
      price: product.price,
      originalPrice: product.originalPrice,
      description: product.ProductTranslations[0].description,
      mainImage: product.mainImage,
      images: product.images,
      specifications: product.specifications,
      sales: product.sales,
      rating: product.rating,
      reviewCount: product.reviewCount,
      stock: product.stock,
      category: {
        id: product.Category.id,
        name: product.Category.CategoryTranslations[0].name
      }
    };

    res.json({
      code: 200,
      message: '获取商品详情成功',
      data: formattedProduct
    });
  } catch (error) {
    console.error('Get product detail error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
}; 