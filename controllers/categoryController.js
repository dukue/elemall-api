const { Op } = require('sequelize');
const Category = require('../models/Category');
const CategoryTranslation = require('../models/CategoryTranslation');
const Language = require('../models/Language');
const Product = require('../models/Product');
const sequelize = require('../config/database');

exports.getCategories = async (req, res) => {
  try {
    const { query = '', lang = 'zh' } = req.query;
    console.log('Getting categories with params:', { query, lang });

    // 先直接查询，看看数据库中有什么
    const allLanguages = await Language.findAll();
    console.log('All available languages:', allLanguages.map(l => l.toJSON()));

    // 获取指定语言
    let language = await Language.findOne({
      where: {
        code: lang
      }
    });
    console.log('Found language:', language ? language.toJSON() : null);

    if (!language) {
      // 如果找不到指定语言，尝试使用默认语言
      language = await Language.findOne({
        where: { isDefault: true }
      });
      console.log('Using default language:', language ? language.toJSON() : null);
      
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
      required: true
    }];

    console.log('Querying categories with include clause:', JSON.stringify(includeClause, null, 2));

    // 查询分类列表
    const categories = await Category.findAll({
      include: includeClause,
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT COUNT(*)
              FROM Products
              WHERE Products.categoryId = Category.id
            )`),
            'productCount'
          ]
        ]
      },
      order: [[{ model: CategoryTranslation }, 'name', 'ASC']]
    });

    console.log('Found categories:', categories.length);
    
    if (categories.length === 0) {
      // 检查是否有任何分类存在
      const totalCategories = await Category.count();
      console.log('Total categories in database:', totalCategories);
      
      // 检查是否有任何翻译存在
      const totalTranslations = await CategoryTranslation.count({
        where: { languageId: language.id }
      });
      console.log('Total translations for language:', totalTranslations);
    }

    // 格式化响应数据
    const formattedCategories = categories.map(category => {
      const translation = category.CategoryTranslations[0];
      return {
        id: category.id,
        name: translation.name,
        description: translation.description,
        productCount: Number(category.getDataValue('productCount')),
        createTime: category.createTime,
        updateTime: category.updateTime
      };
    });

    res.json({
      code: 200,
      message: '获取分类列表成功',
      data: formattedCategories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      code: 500,
      message: error.message || '服务器错误'
    });
  }
};

exports.createCategory = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { translations } = req.body;

    // 获取所有支持的语言
    const languages = await Language.findAll();
    const languageMap = languages.reduce((map, lang) => {
      map[lang.code] = lang.id;
      return map;
    }, {});

    // 检查默认语言是否提供
    const defaultLanguage = languages.find(lang => lang.isDefault);
    if (!defaultLanguage || !translations[defaultLanguage.code]) {
      return res.status(400).json({
        code: 400,
        message: `默认语言 ${defaultLanguage?.code || 'zh'} 的翻译信息不能为空`
      });
    }

    // 创建分类
    const category = await Category.create({}, { transaction });

    // 创建分类翻译
    const translationPromises = Object.entries(translations).map(([langCode, data]) => {
      const languageId = languageMap[langCode];
      if (!languageId) {
        throw new Error(`不支持的语言代码: ${langCode}`);
      }

      return CategoryTranslation.create({
        categoryId: category.id,
        languageId: languageId,
        name: data.name.trim(),
        description: data.description?.trim(),
        seoTitle: data.seoTitle?.trim(),
        seoDescription: data.seoDescription?.trim(),
        seoKeywords: data.seoKeywords?.trim()
      }, { transaction });
    });

    await Promise.all(translationPromises);
    await transaction.commit();

    // 获取创建后的完整数据
    const createdCategory = await Category.findByPk(category.id, {
      include: [{
        model: CategoryTranslation,
        include: [Language]
      }]
    });

    res.status(201).json({
      code: 200,
      message: '分类创建成功',
      data: createdCategory
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Create category error:', error);
    res.status(500).json({
      code: 500,
      message: error.message || '服务器错误'
    });
  }
};

exports.updateCategory = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const { translations } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        code: 404,
        message: '分类不存在'
      });
    }

    // 更新分类翻译
    for (const [langCode, data] of Object.entries(translations)) {
      const language = await Language.findOne({
        where: { code: langCode }
      });

      if (!language) {
        continue;
      }

      await CategoryTranslation.upsert({
        categoryId: category.id,
        languageId: language.id,
        name: data.name,
        description: data.description,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        seoKeywords: data.seoKeywords
      }, { transaction });
    }

    await transaction.commit();

    // 获取更新后的完整数据
    const updatedCategory = await Category.findByPk(id, {
      include: [{
        model: CategoryTranslation,
        include: [Language]
      }]
    });

    res.json({
      code: 200,
      message: '分类更新成功',
      data: updatedCategory
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Update category error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.deleteCategory = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        code: 404,
        message: '分类不存在'
      });
    }

    // 检查分类下是否有商品
    const productCount = await Product.count({
      where: { categoryId: id }
    });

    if (productCount > 0) {
      return res.status(400).json({
        code: 400,
        message: '该分类下存在商品，无法删除'
      });
    }

    await category.destroy({ transaction });
    await transaction.commit();

    res.json({
      code: 200,
      message: '分类删除成功'
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Delete category error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
}; 