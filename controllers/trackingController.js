const { Op } = require('sequelize');
const ShipmentTracking = require('../models/ShipmentTracking');
const TrackingHistory = require('../models/TrackingHistory');
const Order = require('../models/Order');
const sequelize = require('../config/database');

exports.getTracking = async (req, res) => {
  try {
    const { id } = req.params;

    const tracking = await ShipmentTracking.findOne({
      where: { orderId: id },
      include: [{
        model: Order,
        attributes: ['orderNo']
      }]
    });

    if (!tracking) {
      return res.status(404).json({
        code: 404,
        message: '未找到物流信息'
      });
    }

    res.json({
      code: 200,
      message: '获取物流信息成功',
      data: tracking
    });
  } catch (error) {
    console.error('Get tracking error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.createTracking = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const { trackingNo, carrier, estimatedDelivery, originCountry, destinationCountry } = req.body;

    // 检查是否已存在物流信息
    const existingTracking = await ShipmentTracking.findOne({
      where: { orderId: id }
    });

    if (existingTracking) {
      return res.status(400).json({
        code: 400,
        message: '该订单已存在物流信息'
      });
    }

    // 检查追踪号是否已被使用
    const duplicateTracking = await ShipmentTracking.findOne({
      where: { trackingNo }
    });

    if (duplicateTracking) {
      return res.status(400).json({
        code: 400,
        message: '物流追踪号已存在'
      });
    }

    const tracking = await ShipmentTracking.create({
      orderId: id,
      trackingNo,
      carrier,
      status: 'pending',
      estimatedDelivery: estimatedDelivery || null,
      originCountry,
      destinationCountry,
      operatorId: req.user.id
    }, { transaction });

    // 创建首条物流记录
    await TrackingHistory.create({
      trackingId: tracking.id,
      location: `${originCountry}`,
      status: '待发货',
      details: '物流信息已创建',
      eventTime: new Date(),
      operatorId: req.user.id
    }, { transaction });

    await transaction.commit();

    res.status(201).json({
      code: 200,
      message: '创建物流信息成功',
      data: tracking
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Create tracking error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.updateTracking = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id, trackingNo } = req.params;
    const { status, location, details } = req.body;

    const tracking = await ShipmentTracking.findOne({
      where: { 
        orderId: id,
        trackingNo
      }
    });

    if (!tracking) {
      return res.status(404).json({
        code: 404,
        message: '未找到物流信息'
      });
    }

    // 验证状态流转
    const validTransitions = {
      pending: ['in_transit'],
      in_transit: ['arrived', 'customs', 'exception'],
      arrived: ['delivered', 'exception'],
      customs: ['in_transit', 'delivered', 'exception'],
      delivered: [],
      exception: ['in_transit', 'returned'],
      returned: []
    };

    if (!validTransitions[tracking.status].includes(status)) {
      return res.status(400).json({
        code: 400,
        message: '无效的状态变更'
      });
    }

    await tracking.update({ status }, { transaction });

    // 记录物流历史
    await TrackingHistory.create({
      trackingId: tracking.id,
      location,
      status,
      details,
      eventTime: new Date(),
      operatorId: req.user.id
    }, { transaction });

    await transaction.commit();

    res.json({
      code: 200,
      message: '更新物流状态成功',
      data: tracking
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Update tracking error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.getTrackingHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const tracking = await ShipmentTracking.findOne({
      where: { orderId: id }
    });

    if (!tracking) {
      return res.status(404).json({
        code: 404,
        message: '未找到物流信息'
      });
    }

    const history = await TrackingHistory.findAll({
      where: { trackingId: tracking.id },
      order: [['eventTime', 'DESC']]
    });

    res.json({
      code: 200,
      message: '获取物流历史成功',
      data: history
    });
  } catch (error) {
    console.error('Get tracking history error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
}; 