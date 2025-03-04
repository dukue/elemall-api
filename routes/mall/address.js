const express = require('express');
const router = express.Router();
const { addAddress, getAddressList, updateAddress, deleteAddress, setDefaultAddress } = require('../../controllers/mall/addressController');
const { validateAddress } = require('../../middleware/mallValidator');
const { authMallUser } = require('../../middleware/authMiddleware');

// 所有地址相关的接口都需要用户认证
router.use(authMallUser);

// 添加收货地址
router.post('/address', validateAddress, addAddress);

// 获取地址列表
router.get('/address', getAddressList);

// 更新收货地址
router.put('/address/:id', validateAddress, updateAddress);

// 删除收货地址
router.delete('/address/:id', deleteAddress);

// 设置默认地址
router.put('/address/:id/default', setDefaultAddress);

module.exports = router; 