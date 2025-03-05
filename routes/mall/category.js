const express = require('express');
const router = express.Router();
const { getCategories } = require('../../controllers/mall/categoryController');

// 获取分类列表
router.get('/category', getCategories);

module.exports = router; 