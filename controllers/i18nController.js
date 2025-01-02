const { Op } = require('sequelize');
const Language = require('../models/Language');
const ProductTranslation = require('../models/ProductTranslation');
const sequelize = require('../config/database');

exports.getLanguages = async (req, res) => {
  try {
    const { query = '' } = req.query;

    // 构建查询条件
    const whereClause = query
      ? {
          [Op.or]: [
            { code: { [Op.like]: `%${query}%` } },
            { name: { [Op.like]: `%${query}%` } }
          ]
        }
      : {};

    const languages = await Language.findAll({
      where: whereClause,
      order: [
        ['isDefault', 'DESC'],
        ['code', 'ASC']
      ]
    });

    res.json({
      code: 200,
      message: '获取语言列表成功',
      data: languages
    });
  } catch (error) {
    console.error('Get languages error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.createLanguage = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { code, name, isDefault } = req.body;

    // 检查语言代码是否已存在
    const existingLanguage = await Language.findOne({
      where: { code }
    });

    if (existingLanguage) {
      return res.status(400).json({
        code: 400,
        message: '语言代码已存在'
      });
    }

    // 如果设置为默认语言，需要取消其他语言的默认状态
    if (isDefault) {
      await Language.update(
        { isDefault: false },
        { where: {}, transaction }
      );
    }

    const language = await Language.create({
      code,
      name,
      isDefault: !!isDefault
    }, { transaction });

    await transaction.commit();

    res.status(201).json({
      code: 200,
      message: '语言创建成功',
      data: language
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Create language error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.updateLanguage = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const { name, isDefault } = req.body;

    const language = await Language.findByPk(id);
    if (!language) {
      return res.status(404).json({
        code: 404,
        message: '语言不存在'
      });
    }

    // 如果设置为默认语言，需要取消其他语言的默认状态
    if (isDefault) {
      await Language.update(
        { isDefault: false },
        { where: { id: { [Op.ne]: id } }, transaction }
      );
    }

    await language.update({
      name,
      isDefault: !!isDefault
    }, { transaction });

    await transaction.commit();

    res.json({
      code: 200,
      message: '语言更新成功',
      data: language
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Update language error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.deleteLanguage = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;

    const language = await Language.findByPk(id);
    if (!language) {
      return res.status(404).json({
        code: 404,
        message: '语言不存在'
      });
    }

    // 不允许删除默认语言
    if (language.isDefault) {
      return res.status(400).json({
        code: 400,
        message: '不能删除默认语言'
      });
    }

    // 检查是否有关联的翻译数据
    const hasTranslations = await ProductTranslation.count({
      where: { languageId: id }
    });

    if (hasTranslations > 0) {
      return res.status(400).json({
        code: 400,
        message: '该语言下存在商品翻译数据，无法删除'
      });
    }

    await language.destroy({ transaction });
    await transaction.commit();

    res.json({
      code: 200,
      message: '语言删除成功'
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Delete language error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
}; 