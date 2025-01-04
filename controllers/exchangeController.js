const { Op } = require('sequelize');
const ExchangeRate = require('../models/ExchangeRate');
const sequelize = require('../config/database');

exports.getRates = async (req, res) => {
  try {
    const { query = '' } = req.query;

    // 构建查询条件
    const whereClause = query
      ? {
          [Op.or]: [
            { fromCurrency: { [Op.like]: `%${query.toUpperCase()}%` } },
            { toCurrency: { [Op.like]: `%${query.toUpperCase()}%` } }
          ]
        }
      : {};

    const rates = await ExchangeRate.findAll({
      where: whereClause,
      order: [
        ['fromCurrency', 'ASC'],
        ['toCurrency', 'ASC']
      ]
    });

    res.json({
      code: 200,
      message: '获取汇率列表成功',
      data: rates
    });
  } catch (error) {
    console.error('Get rates error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.createRate = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { fromCurrency, toCurrency, rate } = req.body;

    // 检查是否已存在相同的币种对
    const existingRate = await ExchangeRate.findOne({
      where: {
        fromCurrency,
        toCurrency
      }
    });

    if (existingRate) {
      return res.status(400).json({
        code: 400,
        message: '该币种对的汇率已存在'
      });
    }

    const exchangeRate = await ExchangeRate.create({
      fromCurrency,
      toCurrency,
      rate
    }, { transaction });

    // 自动创建反向汇率
    await ExchangeRate.create({
      fromCurrency: toCurrency,
      toCurrency: fromCurrency,
      rate: 1 / rate
    }, { transaction });

    await transaction.commit();

    res.status(201).json({
      code: 200,
      message: '汇率创建成功',
      data: exchangeRate
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Create rate error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.updateRate = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const { isActive, rate } = req.body;

    // 查找当前汇率记录
    const currentRate = await ExchangeRate.findByPk(id);
    
    if (!currentRate) {
      return res.status(404).json({
        code: 404,
        message: '汇率不存在'
      });
    }

    // 准备更新数据
    const updateData = {};
    if (isActive !== undefined) {
      updateData.isActive = isActive;
    }
    if (rate !== undefined) {
      updateData.rate = rate;
    }

    // 更新汇率
    await currentRate.update(updateData, { transaction });

    // 查找并更新反向汇率
    const reverseRate = await ExchangeRate.findOne({
      where: {
        fromCurrency: currentRate.toCurrency,
        toCurrency: currentRate.fromCurrency
      }
    });

    if (reverseRate) {
      const reverseUpdateData = {};
      if (isActive !== undefined) {
        reverseUpdateData.isActive = isActive;
      }
      if (rate !== undefined) {
        reverseUpdateData.rate = 1 / rate;
      }
      await reverseRate.update(reverseUpdateData, { transaction });
    }

    await transaction.commit();

    // 获取更新后的完整数据
    const updatedRate = await ExchangeRate.findByPk(id);

    res.json({
      code: 200,
      message: '汇率更新成功',
      data: updatedRate
    });

  } catch (error) {
    await transaction.rollback();
    console.error('Update rate error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.convertAmount = async (req, res) => {
  try {
    const { from, to, amount } = req.query;

    if (!from || !to || !amount) {
      return res.status(400).json({
        code: 400,
        message: '缺少必要的参数'
      });
    }

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return res.status(400).json({
        code: 400,
        message: '金额必须是大于0的数字'
      });
    }

    // 查找汇率
    const rate = await ExchangeRate.findOne({
      where: {
        fromCurrency: from.toUpperCase(),
        toCurrency: to.toUpperCase(),
        isActive: true
      }
    });

    if (!rate) {
      return res.status(404).json({
        code: 404,
        message: '未找到对应的汇率'
      });
    }

    const convertedAmount = numAmount * rate.rate;

    res.json({
      code: 200,
      message: '汇率转换成功',
      data: {
        from,
        to,
        amount: numAmount,
        rate: rate.rate,
        convertedAmount: Number(convertedAmount.toFixed(2))
      }
    });
  } catch (error) {
    console.error('Convert amount error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
}; 