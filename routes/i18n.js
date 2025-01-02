const express = require('express');
const router = express.Router();
const { 
  getLanguages,
  createLanguage,
  updateLanguage,
  deleteLanguage
} = require('../controllers/i18nController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validateLanguage } = require('../middleware/validator');

router.get('/languages', authMiddleware, getLanguages);
router.post('/languages', [authMiddleware, validateLanguage], createLanguage);
router.put('/languages/:id', [authMiddleware, validateLanguage], updateLanguage);
router.delete('/languages/:id', authMiddleware, deleteLanguage);

module.exports = router; 