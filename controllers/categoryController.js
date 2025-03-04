const { Op } = require('sequelize');
const Category = require('../models/Category');
const CategoryTranslation = require('../models/CategoryTranslation');
const Language = require('../models/Language');
const Product = require('../models/Product');
const sequelize = require('../config/database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 配置文件上传
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/categories')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'category-' + uniqueSuffix + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 限制5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('只允许上传图片文件'));
    }
  }
});

exports.getCategories = async (req, res) => {
  try {
    const { query = '', lang = 'zh' } = req.query;

    // 获取指定语言
    let language = await Language.findOne({
      where: { code: lang }
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

    // 查询分类列表
    const categories = await Category.findAll({
      include: [{
        model: CategoryTranslation,
        where: {
          languageId: language.id,
          ...(query && {
            name: { [Op.like]: `%${query}%` }
          })
        },
        required: true
      }],
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
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id, {
      include: [{
        model: CategoryTranslation,
        include: [{
          model: Language,
          attributes: ['id', 'code', 'name']
        }]
      }]
    });

    if (!category) {
      return res.status(404).json({
        code: 404,
        message: '分类不存在'
      });
    }

    // 格式化翻译数据
    const translations = {};
    category.CategoryTranslations.forEach(translation => {
      translations[translation.Language.code] = {
        name: translation.name,
        description: translation.description,
        seoTitle: translation.seoTitle,
        seoDescription: translation.seoDescription,
        seoKeywords: translation.seoKeywords
      };
    });

    // 格式化响应数据
    const formattedCategory = {
      id: category.id,
      image: category.image,
      translations,
      createTime: category.createTime,
      updateTime: category.updateTime
    };

    res.json({
      code: 200,
      message: '获取分类详情成功',
      data: formattedCategory
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.createCategory = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const rawTranslations = req.body.translations;
    let translations;

    if (typeof rawTranslations === 'string') {
      try {
        const cleanTranslations = rawTranslations
          .trim()
          .replace(/[\r\n\s]+/g, ' ')
          .replace(/"\s+}/g, '"}')
          .replace(/{\s+"/g, '{"');

        translations = JSON.parse(cleanTranslations);
      } catch (error) {
        return res.status(400).json({
          code: 400,
          message: '分类翻译信息格式不正确: ' + error.message
        });
      }
    } else if (typeof rawTranslations === 'object' && rawTranslations !== null) {
      translations = rawTranslations;
    } else {
      return res.status(400).json({
        code: 400,
        message: '分类翻译信息不能为空'
      });
    }

    const image = req.file ? 
      '/uploads/categories/' + path.basename(req.file.path) : null;

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

    // 检查每个语言版本的分类名称是否已存在
    for (const [langCode, data] of Object.entries(translations)) {
      const languageId = languageMap[langCode];
      if (!languageId) continue;

      const existingCategory = await CategoryTranslation.findOne({
        where: {
          name: data.name,
          languageId: languageId
        }
      });

      if (existingCategory) {
        return res.status(400).json({
          code: 400,
          message: `${langCode}语言的分类名称"${data.name}"已存在`
        });
      }
    }

    // 创建分类
    const category = await Category.create({
      image
    }, { transaction });

    // 创建分类翻译
    for (const [langCode, data] of Object.entries(translations)) {
      const languageId = languageMap[langCode];
      if (!languageId) continue;

      await CategoryTranslation.create({
        categoryId: category.id,
        languageId: languageId,
        name: data.name.trim(),
        description: data.description?.trim(),
        seoTitle: data.seoTitle?.trim(),
        seoDescription: data.seoDescription?.trim(),
        seoKeywords: data.seoKeywords?.trim()
      }, { transaction });
    }

    await transaction.commit();

    // 获取创建后的完整数据
    const newCategory = await Category.findByPk(category.id, {
      include: [{
        model: CategoryTranslation,
        include: [Language]
      }]
    });

    res.status(201).json({
      code: 200,
      message: '分类创建成功',
      data: newCategory
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Create category error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.updateCategory = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const { translations } = req.body;  // translations已经在验证中间件中被解析为对象

    // 验证分类是否存在
    const category = await Category.findByPk(id);
    if (!category) {
      await transaction.rollback();
      return res.status(404).json({
        code: 404,
        message: '分类不存在'
      });
    }

    // 获取所有支持的语言
    const languages = await Language.findAll();
    const languageMap = languages.reduce((map, lang) => {
      map[lang.code] = lang.id;
      return map;
    }, {});

    // 更新图片
    if (req.file) {
      // 如果有旧图片，删除它
      if (category.image) {
        const oldImagePath = path.join(__dirname, '..', category.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      category.image = '/uploads/categories/' + path.basename(req.file.path);
    }

    // 更新分类信息
    await category.update({
      image: category.image
    }, { transaction });

    // 更新翻译信息
    for (const [langCode, data] of Object.entries(translations)) {
      const languageId = languageMap[langCode];
      if (!languageId) {
        await transaction.rollback();
        return res.status(400).json({
          code: 400,
          message: `不支持的语言代码: ${langCode}`
        });
      }

      await CategoryTranslation.upsert({
        categoryId: id,
        languageId: languageId,
        name: data.name.trim(),
        description: data.description?.trim(),
        seoTitle: data.seoTitle?.trim(),
        seoDescription: data.seoDescription?.trim(),
        seoKeywords: data.seoKeywords?.trim()
      }, { transaction });
    }

    await transaction.commit();

    // 获取更新后的完整数据
    const updatedCategory = await Category.findByPk(id, {
      include: [{
        model: CategoryTranslation,
        include: [{
          model: Language,
          attributes: ['code']
        }]
      }]
    });

    // 格式化响应数据
    const formattedTranslations = {};
    updatedCategory.CategoryTranslations.forEach(translation => {
      formattedTranslations[translation.Language.code] = {
        name: translation.name,
        description: translation.description,
        seoTitle: translation.seoTitle,
        seoDescription: translation.seoDescription,
        seoKeywords: translation.seoKeywords
      };
    });

    return res.json({
      code: 200,
      message: '分类更新成功',
      data: {
        id: updatedCategory.id,
        image: updatedCategory.image,
        translations: formattedTranslations
      }
    });

  } catch (error) {
    await transaction.rollback();
    console.error('Update category error:', error);
    return res.status(500).json({
      code: 500,
      message: '更新分类失败: ' + error.message
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