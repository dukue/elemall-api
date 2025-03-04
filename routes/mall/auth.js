const express = require('express');
const router = express.Router();
const { register, login, getUserInfo, updateUserInfo, updatePassword } = require('../../controllers/mall/authController');
const { validateMallUserRegister, validateMallUserLogin, validateMallUserUpdate, validatePasswordUpdate } = require('../../middleware/mallValidator');
const { authMallUser } = require('../../middleware/authMiddleware');

// 公开接口
router.post('/user/register', validateMallUserRegister, register);
router.post('/user/login', validateMallUserLogin, login);

// 需要认证的接口
router.get('/user/info', authMallUser, getUserInfo);
router.put('/user/info', authMallUser, validateMallUserUpdate, updateUserInfo);
router.put('/user/password', authMallUser, validatePasswordUpdate, updatePassword);

module.exports = router; 