const express = require('express');
const router = express.Router();
const { register, login } = require('../../controllers/mall/authController');
const { validateMallUserRegister, validateMallUserLogin } = require('../../middleware/mallValidator');

router.post('/register', validateMallUserRegister, register);
router.post('/login', validateMallUserLogin, login);

module.exports = router; 