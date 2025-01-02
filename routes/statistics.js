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

router.get('/statistics/overview', authMiddleware, getOverview);
router.get('/statistics/sales', authMiddleware, getSalesTrend);
router.get('/statistics/categories', authMiddleware, getCategoryStats);
router.get('/statistics/payments', authMiddleware, getPaymentStats);

router.get('/statistics/sales/international', authMiddleware, getInternationalSales);
router.get('/statistics/sales/by-country', authMiddleware, getSalesByCountry);
router.get('/statistics/sales/by-currency', authMiddleware, getSalesByCurrency);

router.get('/statistics/logistics/cost', authMiddleware, getLogisticsCost);
router.get('/statistics/logistics/time', authMiddleware, getLogisticsTime);
router.get('/statistics/logistics/carrier-performance', authMiddleware, getCarrierPerformance);

module.exports = router; 