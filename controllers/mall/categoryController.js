const { Op } = require('sequelize');
const { Category, CategoryTranslation, Language } = require('../../models/associations');
const sequelize = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const { query = '', lang = 'zh' } = req.query;

    // 获取指定语言
    let language = await Language.findOne({
      where: {
        code: lang
      }
    });

    if (!language) {
      // 如果找不到指定语言，使用默认语言
      language = await Language.findOne({
        where: { isDefault: true }
      });
      
      if (!language) {
        return res.status(400).json({
          code: 400,
          message: '不支持的语言代码'
        });
      }
    }

    // 构建查询条件
    const includeClause = [{
      model: CategoryTranslation,
      where: {
        languageId: language.id,
        ...(query && {
          name: { [Op.like]: `%${query}%` }
        })
      },
      attributes: ['name', 'description', 'seoTitle', 'seoDescription', 'seoKeywords']
    }];

    // 查询分类列表
    const categories = await Category.findAll({
      attributes: [
        'id',
        'image',
        'createTime',
        'updateTime',
        [
          sequelize.literal(`(
            SELECT COUNT(*)
            FROM Products
            WHERE Products.categoryId = Category.id
          )`),
          'productCount'
        ]
      ],
      include: includeClause,
      order: [
        [{ model: CategoryTranslation }, 'name', 'ASC']
      ]
    });

    // 格式化响应数据
    const formattedCategories = categories.map(category => ({
      id: category.id,
      name: category.CategoryTranslations[0]?.name,
      description: category.CategoryTranslations[0]?.description,
      image: category.image,
      seoTitle: category.CategoryTranslations[0]?.seoTitle,
      seoDescription: category.CategoryTranslations[0]?.seoDescription,
      seoKeywords: category.CategoryTranslations[0]?.seoKeywords,
      productCount: Number(category.getDataValue('productCount'))
    }));

    res.json({
      code: 200,
      message: '获取分类列表成功',
      data: formattedCategories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
}; 