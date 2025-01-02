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

router.get('/orders/:id/tracking', authMiddleware, getTracking);
router.post('/orders/:id/tracking', [authMiddleware, validateTracking], createTracking);
router.put('/orders/:id/tracking/:trackingNo', [authMiddleware, validateTrackingUpdate], updateTracking);
router.get('/orders/:id/tracking/history', authMiddleware, getTrackingHistory);

module.exports = router; 