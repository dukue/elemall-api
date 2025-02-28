const express = require('express');
const router = express.Router();
const { 
  getTracking,
  createTracking,
  updateTracking,
  getTrackingHistory
} = require('../controllers/trackingController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validateTracking, validateTrackingUpdate } = require('../middleware/validator');
const ShipmentTracking = require('../models/ShipmentTracking');
const Order = require('../models/Order');
const TrackingHistory = require('../models/TrackingHistory');

router.get('/orders/:orderId/tracking', authMiddleware, async (req, res) => {
  try {
    const tracking = await ShipmentTracking.findOne({
      where: { orderId: req.params.orderId },
      include: [
        {
          model: Order,
          attributes: ['orderNo']
        }
      ]
    });

    if (!tracking) {
      return res.status(404).json({
        code: 404,
        message: '物流信息不存在'
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
});

router.post('/orders/:orderId/tracking', [authMiddleware, validateTracking], async (req, res) => {
  try {
    const tracking = await ShipmentTracking.create({
      orderId: req.params.orderId,
      trackingNo: req.body.trackingNo,
      carrier: req.body.carrier,
      status: 'pending',
      estimatedDelivery: req.body.estimatedDelivery,
      originCountry: req.body.originCountry,
      destinationCountry: req.body.destinationCountry,
      operatorId: req.user.id
    });

    res.status(201).json({
      code: 200,
      message: '创建物流追踪成功',
      data: tracking
    });
  } catch (error) {
    console.error('Create tracking error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
});

router.put('/orders/:orderId/tracking/:trackingNo', [authMiddleware, validateTrackingUpdate], async (req, res) => {
  try {
    const tracking = await ShipmentTracking.findOne({
      where: { 
        orderId: req.params.orderId,
        trackingNo: req.params.trackingNo
      }
    });

    if (!tracking) {
      return res.status(404).json({
        code: 404,
        message: '物流信息不存在'
      });
    }

    await tracking.update({
      status: req.body.status
    });
    
    // 创建历史记录
    await TrackingHistory.create({
      trackingId: tracking.id,
      location: req.body.location,
      status: req.body.status,
      details: req.body.details,
      eventTime: new Date(),
      operatorId: req.user.id
    });

    res.json({
      code: 200,
      message: '更新物流状态成功'
    });
  } catch (error) {
    console.error('Update tracking error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
});

router.get('/orders/:orderId/tracking/history', authMiddleware, async (req, res) => {
  try {
    const tracking = await ShipmentTracking.findOne({
      where: { orderId: req.params.orderId }
    });
    
    if (!tracking) {
      return res.status(404).json({
        code: 404,
        message: '物流信息不存在'
      });
    }

    const history = await TrackingHistory.findAll({
      where: { trackingId: tracking.id },
      order: [['eventTime', 'DESC']]
    });

    res.json({
      code: 200,
      message: '获取物流历史记录成功',
      data: history
    });
  } catch (error) {
    console.error('Get tracking history error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
});

module.exports = router; 