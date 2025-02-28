const express = require('express');
const router = express.Router();
const { 
  getOverview, 
  getSalesTrend,
  getCategoryStats,
  getPaymentStats,
  getInternationalSales,
  getSalesByCountry,
  getSalesByCurrency,
  getLogisticsCost,
  getLogisticsTime,
  getCarrierPerformance
} = require('../controllers/statisticsController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/overview', authMiddleware, getOverview);
router.get('/sales', authMiddleware, getSalesTrend);
router.get('/categories', authMiddleware, getCategoryStats);
router.get('/payments', authMiddleware, getPaymentStats);

router.get('/sales/international', authMiddleware, getInternationalSales);
router.get('/sales/by-country', authMiddleware, getSalesByCountry);
router.get('/sales/by-currency', authMiddleware, getSalesByCurrency);

router.get('/logistics/cost', authMiddleware, getLogisticsCost);
router.get('/logistics/time', authMiddleware, getLogisticsTime);
router.get('/logistics/carrier-performance', authMiddleware, getCarrierPerformance);

module.exports = router; 