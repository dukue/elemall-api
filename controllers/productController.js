const { Op } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('../models/Product');
const ProductTranslation = require('../models/ProductTranslation');
const Category = require('../models/Category');
const CategoryTranslation = require('../models/CategoryTranslation');
const Language = require('../models/Language');
const OrderProduct = require('../models/OrderProduct');
const Inventory = require('../models/Inventory');
const InventoryTransaction = require('../models/InventoryTransaction');
const Warehouse = require('../models/Warehouse');

exports.getProducts = async (req, res) => {
  try {
    const { query = '', pagenum = 1, pagesize = 10, lang = 'zh' } = req.query;
    const offset = (pagenum - 1) * pagesize;

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
    const whereClause = {};
    const includeClause = [
      {
        model: ProductTranslation,
        where: {
          languageId: language.id,
          ...(query && {
            [Op.or]: [
              { name: { [Op.like]: `%${query}%` } },
              { description: { [Op.like]: `%${query}%` } }
            ]
          })
        },
        required: true
      },
      {
        model: Category,
        required: false,
        include: [{
          model: CategoryTranslation,
          where: { languageId: language.id },
          required: false
        }]
      }
    ];

    // 查询商品列表和总数
    const { count, rows } = await Product.findAndCountAll({
      where: whereClause,
      include: includeClause,
      offset: Number(offset),
      limit: Number(pagesize),
      order: [['createTime', 'DESC']],
      distinct: true
    });

    // 格式化响应数据
    const products = rows.map(product => ({
      id: product.id,
      name: product.ProductTranslations[0].name,
      price: product.price,
      weight: product.weight,
      status: product.status,
      image: product.image,
      images: product.images,
      category: product.Category ? {
        id: product.Category.id,
        name: product.Category.CategoryTranslations[0]?.name
      } : null,
      description: product.ProductTranslations[0].description,
      specifications: product.ProductTranslations[0].specifications,
      createTime: product.createTime,
      updateTime: product.updateTime
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
      message: error.message || '服务器错误'
    });
  }
};

exports.createProduct = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { 
      price, 
      weight, 
      status = true,
      categoryId,
      translations,
      initialInventory
    } = req.body;

    // 检查分类是否存在
    if (categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(400).json({
          code: 400,
          message: '指定的分类不存在'
        });
      }
    }

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

    // 创建商品基本信息
    const product = await Product.create({
      price,
      weight,
      status,
      categoryId
    }, { transaction });

    // 创建商品翻译
    for (const [langCode, data] of Object.entries(translations)) {
      const languageId = languageMap[langCode];
      if (!languageId) {
        throw new Error(`不支持的语言代码: ${langCode}`);
      }

      // 检查这个语言的数据是否有效（非空）
      const isEmptyTranslation = !data.name?.trim() && !data.description?.trim() && 
        (!data.specifications || Object.keys(data.specifications).length === 0);

      // 如果是空的翻译，跳过创建
      if (isEmptyTranslation) {
        continue;
      }

      await ProductTranslation.create({
        productId: product.id,
        languageId: languageId,
        name: data.name.trim(),
        description: data.description?.trim() || '',
        specifications: data.specifications || {}
      }, { transaction });
    }

    // 如果提供了初始库存信息，创建库存记录
    if (initialInventory && Array.isArray(initialInventory)) {
      for (const item of initialInventory) {
        const { warehouseId, quantity, safetyStock } = item;
        
        // 检查仓库是否存在
        const warehouse = await Warehouse.findByPk(warehouseId);
        if (!warehouse) {
          throw new Error(`仓库ID ${warehouseId} 不存在`);
        }

        // 创建库存记录
        await Inventory.create({
          productId: product.id,
          warehouseId,
          quantity,
          safetyStock
        }, { transaction });

        // 创建入库流水记录
        await InventoryTransaction.create({
          productId: product.id,
          toWarehouseId: warehouseId,
          quantity,
          type: 'in',
          reason: '初始库存',
          operatorId: req.user.id
        }, { transaction });
      }
    }

    await transaction.commit();

    // 获取创建的商品完整信息
    const createdProduct = await Product.findByPk(product.id, {
      include: [
        {
          model: ProductTranslation,
          include: [Language]
        },
        {
          model: Category,
          include: [{
            model: CategoryTranslation,
            include: [Language]
          }]
        },
        {
          model: Inventory,
          include: [Warehouse]
        }
      ]
    });

    res.status(201).json({
      code: 200,
      message: '商品创建成功',
      data: createdProduct
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Create product error:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        code: 400,
        message: error.errors[0].message
      });
    }
    res.status(500).json({
      code: 500,
      message: error.message || '服务器错误'
    });
  }
};

exports.updateProduct = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const { price, weight, status, categoryId, translations } = req.body;

    // 检查商品是否存在
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        code: 404,
        message: '商品不存在'
      });
    }

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

    // 更新商品基本信息
    await product.update({
      price,
      weight,
      status,
      categoryId
    }, { transaction });

    // 更新商品翻译
    for (const [langCode, data] of Object.entries(translations)) {
      const languageId = languageMap[langCode];
      if (!languageId) {
        throw new Error(`不支持的语言代码: ${langCode}`);
      }

      await ProductTranslation.upsert({
        productId: product.id,
        languageId: languageId,
        name: data.name.trim(),
        description: data.description?.trim(),
        specifications: data.specifications,
        seoTitle: data.seoTitle?.trim(),
        seoDescription: data.seoDescription?.trim(),
        seoKeywords: data.seoKeywords?.trim()
      }, { transaction });
    }

    await transaction.commit();

    // 获取更新后的完整数据
    const updatedProduct = await Product.findByPk(id, {
      include: [
        {
          model: ProductTranslation,
          include: [Language]
        },
        {
          model: Category,
          include: [{
            model: CategoryTranslation,
            include: [Language]
          }]
        }
      ]
    });

    res.json({
      code: 200,
      message: '商品更新成功',
      data: updatedProduct
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Update product error:', error);
    res.status(500).json({
      code: 500,
      message: error.message || '服务器错误'
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        code: 404,
        message: '商品不存在'
      });
    }

    // 检查是否存在订单关联
    const hasOrders = await OrderProduct.count({
      where: { ProductId: id }
    });

    if (hasOrders > 0) {
      return res.status(400).json({
        code: 400,
        message: '该商品已有订单记录，无法删除'
      });
    }

    // 删除商品相关的所有记录
    // 1. 删除库存记录
    await Inventory.destroy({
      where: { productId: id },
      transaction
    });

    // 2. 删除库存交易记录
    await InventoryTransaction.destroy({
      where: { productId: id },
      transaction
    });

    // 3. 删除商品翻译
    await ProductTranslation.destroy({
      where: { productId: id },
      transaction
    });

    // 4. 最后删除商品
    await product.destroy({ transaction });

    await transaction.commit();

    res.json({
      code: 200,
      message: '商品删除成功'
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Delete product error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.updateProductStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
      return res.status(400).json({
        code: 400,
        message: '状态值必须是布尔类型'
      });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        code: 404,
        message: '商品不存在'
      });
    }

    await product.update({ status });

    res.json({
      code: 200,
      message: '商品状态更新成功',
      data: {
        id: product.id,
        status: product.status
      }
    });
  } catch (error) {
    console.error('Update product status error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.createProductWithTranslations = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { 
      price, 
      weight, 
      status,
      categoryId,
      translations,
      initialInventory
    } = req.body;

    // 创建商品基本信息
    const product = await Product.create({
      price,
      weight,
      status,
      categoryId
    }, { transaction });

    // 获取所有语言
    const languages = await Language.findAll({
      where: {
        code: Object.keys(translations)
      }
    });

    // 创建语言代码到ID的映射
    const languageMap = languages.reduce((map, lang) => {
      map[lang.code] = lang.id;
      return map;
    }, {});

    // 创建商品翻译 - 使用 for...of 替代 Promise.all
    for (const [langCode, data] of Object.entries(translations)) {
      const languageId = languageMap[langCode];
      if (!languageId) {
        throw new Error(`不支持的语言代码: ${langCode}`);
      }

      await ProductTranslation.create({
        productId: product.id,
        languageId: languageId,
        name: data.name,
        description: data.description,
        specifications: data.specifications
      }, { transaction });
    }

    // 如果提供了初始库存信息，创建库存记录
    if (initialInventory && Array.isArray(initialInventory)) {
      for (const item of initialInventory) {
        const { warehouseId, quantity, safetyStock = 10 } = item;
        
        // 检查仓库是否存在
        const warehouse = await Warehouse.findByPk(warehouseId);
        if (!warehouse) {
          throw new Error(`仓库ID ${warehouseId} 不存在`);
        }

        // 创建库存记录
        await Inventory.create({
          productId: product.id,
          warehouseId,
          quantity,
          safetyStock
        }, { transaction });

        // 创建入库流水记录
        await InventoryTransaction.create({
          productId: product.id,
          toWarehouseId: warehouseId,
          quantity,
          type: 'in',
          reason: '初始库存',
          operatorId: req.user.id
        }, { transaction });
      }
    }

    await transaction.commit();

    // 获取完整的商品信息（包含翻译和库存）
    const productWithDetails = await Product.findByPk(product.id, {
      include: [
        {
          model: ProductTranslation,
          include: [Language]
        },
        {
          model: Inventory,
          include: [Warehouse]
        }
      ]
    });

    res.status(201).json({
      code: 200,
      message: '商品创建成功',
      data: productWithDetails
    });
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }
    console.error('Create product error:', error);
    res.status(500).json({
      code: 500,
      message: error.message || '服务器错误'
    });
  }
};

exports.getProductWithTranslations = async (req, res) => {
  try {
    const { id } = req.params;
    const { lang } = req.query; // 可选的语言参数

    // 首先检查语言是否存在
    if (lang) {
      const language = await Language.findOne({
        where: { code: lang }
      });

      if (!language) {
        return res.status(400).json({
          code: 400,
          message: '不支持的语言代码'
        });
      }
    }

    const include = [{
      model: ProductTranslation,
      include: [{
        model: Language,
        where: lang ? { code: lang } : undefined
      }]
    }];

    const product = await Product.findByPk(id, { include });

    if (!product) {
      return res.status(404).json({
        code: 404,
        message: '商品不存在'
      });
    }

    // 格式化响应数据
    const translations = {};
    product.ProductTranslations.forEach(translation => {
      translations[translation.Language.code] = {
        name: translation.name,
        description: translation.description,
        specifications: translation.specifications,
        seoTitle: translation.seoTitle,
        seoDescription: translation.seoDescription,
        seoKeywords: translation.seoKeywords
      };
    });

    const formattedProduct = {
      id: product.id,
      price: product.price,
      weight: product.weight,
      status: product.status,
      image: product.image,
      images: product.images,
      translations,
      createTime: product.createTime,
      updateTime: product.updateTime
    };

    res.json({
      code: 200,
      message: '获取商品信息成功',
      data: formattedProduct
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.getProductTranslations = async (req, res) => {
  try {
    const { id } = req.params;
    const { lang } = req.query;

    const include = [{
      model: Language,
      attributes: ['code', 'name']
    }];

    // 如果指定了语言，只返回该语言的翻译
    if (lang) {
      include[0].where = { code: lang };
    }

    const translations = await ProductTranslation.findAll({
      where: { productId: id },
      include,
      order: [[Language, 'code', 'ASC']]
    });

    if (!translations.length) {
      return res.status(404).json({
        code: 404,
        message: '未找到商品翻译信息'
      });
    }

    res.json({
      code: 200,
      message: '获取商品翻译信息成功',
      data: translations
    });
  } catch (error) {
    console.error('Get product translations error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.createProductTranslation = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const { lang, name, description, specifications } = req.body;

    // 检查商品是否存在
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        code: 404,
        message: '商品不存在'
      });
    }

    // 检查语言是否存在
    const language = await Language.findOne({
      where: { code: lang }
    });

    if (!language) {
      return res.status(404).json({
        code: 404,
        message: '不支持的语言代码'
      });
    }

    // 检查是否已存在该语言的翻译
    const existingTranslation = await ProductTranslation.findOne({
      where: {
        productId: id,
        languageId: language.id
      }
    });

    if (existingTranslation) {
      return res.status(400).json({
        code: 400,
        message: '该语言的商品翻译已存在'
      });
    }

    const translation = await ProductTranslation.create({
      productId: id,
      languageId: language.id,
      name,
      description,
      specifications
    }, { transaction });

    await transaction.commit();

    res.status(201).json({
      code: 200,
      message: '商品翻译创建成功',
      data: translation
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Create product translation error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.updateProductTranslation = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id, lang } = req.params;
    const { name, description, specifications } = req.body;

    // 检查语言是否存在
    const language = await Language.findOne({
      where: { code: lang }
    });

    if (!language) {
      return res.status(404).json({
        code: 404,
        message: '不支持的语言代码'
      });
    }

    // 查找并更新翻译
    const translation = await ProductTranslation.findOne({
      where: {
        productId: id,
        languageId: language.id
      }
    });

    if (!translation) {
      return res.status(404).json({
        code: 404,
        message: '未找到该语言的商品翻译'
      });
    }

    await translation.update({
      name,
      description,
      specifications
    }, { transaction });

    await transaction.commit();

    res.json({
      code: 200,
      message: '商品翻译更新成功',
      data: translation
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Update product translation error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.deleteProductTranslation = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id, lang } = req.params;

    // 检查语言是否存在
    const language = await Language.findOne({
      where: { code: lang }
    });

    if (!language) {
      return res.status(404).json({
        code: 404,
        message: '不支持的语言代码'
      });
    }

    // 查找翻译
    const translation = await ProductTranslation.findOne({
      where: {
        productId: id,
        languageId: language.id
      }
    });

    if (!translation) {
      return res.status(404).json({
        code: 404,
        message: '未找到该语言的商品翻译'
      });
    }

    // 不允许删除默认语言的翻译
    if (language.isDefault) {
      return res.status(400).json({
        code: 400,
        message: '不能删除默认语言的翻译'
      });
    }

    await translation.destroy({ transaction });
    await transaction.commit();

    res.json({
      code: 200,
      message: '商品翻译删除成功'
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Delete product translation error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.getProductDetail = async (req, res) => {
  try {
    const { id } = req.params;

    // 查询商品及其所有翻译
    const product = await Product.findByPk(id, {
      include: [
        {
          model: ProductTranslation,
          include: [Language]
        },
        {
          model: Category,
          include: [{
            model: CategoryTranslation,
            include: [Language]
          }]
        }
      ]
    });

    if (!product) {
      return res.status(404).json({
        code: 404,
        message: '商品不存在'
      });
    }

    // 格式化翻译数据
    const translations = {};
    product.ProductTranslations.forEach(translation => {
      translations[translation.Language.code] = {
        name: translation.name,
        description: translation.description,
        specifications: translation.specifications,
        seoTitle: translation.seoTitle,
        seoDescription: translation.seoDescription,
        seoKeywords: translation.seoKeywords
      };
    });

    // 格式化分类数据
    const categoryTranslations = {};
    if (product.Category) {
      product.Category.CategoryTranslations.forEach(translation => {
        categoryTranslations[translation.Language.code] = {
          name: translation.name,
          description: translation.description
        };
      });
    }

    // 构建响应数据
    const formattedProduct = {
      id: product.id,
      price: product.price,
      weight: product.weight,
      status: product.status,
      image: product.image,
      images: product.images,
      category: product.Category ? {
        id: product.Category.id,
        translations: categoryTranslations
      } : null,
      translations,
      createTime: product.createTime,
      updateTime: product.updateTime
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
      message: error.message || '服务器错误'
    });
  }
};

exports.uploadProductImage = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        code: 400,
        message: '请上传图片文件'
      });
    }

    // 检查商品是否存在
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        code: 404,
        message: '商品不存在'
      });
    }

    // 更新商品主图
    await product.update({
      image: file.path.replace(/\\/g, '/')  // 统一使用正斜杠
    }, { transaction });

    await transaction.commit();

    res.json({
      code: 200,
      message: '商品主图上传成功',
      data: {
        image: file.path.replace(/\\/g, '/')
      }
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Upload product image error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.uploadProductImages = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({
        code: 400,
        message: '请上传图片文件'
      });
    }

    // 检查商品是否存在
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        code: 404,
        message: '商品不存在'
      });
    }

    // 获取现有的图片集合
    const existingImages = product.images || [];

    // 添加新上传的图片
    const newImages = files.map(file => file.path.replace(/\\/g, '/'));
    const updatedImages = [...existingImages, ...newImages];

    // 更新商品图片集
    await product.update({
      images: updatedImages
    }, { transaction });

    await transaction.commit();

    res.json({
      code: 200,
      message: '商品图片上传成功',
      data: {
        images: updatedImages
      }
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Upload product images error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
}; 