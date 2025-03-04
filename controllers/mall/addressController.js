const MallAddress = require('../../models/MallAddress');

// 添加收货地址
exports.addAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { receiverName, receiverPhone, province, city, district, detailAddress, isDefault } = req.body;

    // 如果设置为默认地址，先将其他地址设为非默认
    if (isDefault) {
      await MallAddress.update(
        { isDefault: false },
        { where: { userId } }
      );
    }

    const address = await MallAddress.create({
      userId,
      receiverName,
      receiverPhone,
      province,
      city,
      district,
      detailAddress,
      isDefault: isDefault || false
    });

    res.status(200).json({
      code: 200,
      message: '添加成功',
      data: address
    });
  } catch (error) {
    console.error('添加收货地址失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

// 获取地址列表
exports.getAddressList = async (req, res) => {
  try {
    const userId = req.user.id;
    const addresses = await MallAddress.findAll({
      where: { userId },
      order: [
        ['isDefault', 'DESC'],
        ['createTime', 'DESC']
      ]
    });

    res.status(200).json({
      code: 200,
      data: {
        total: addresses.length,
        list: addresses
      }
    });
  } catch (error) {
    console.error('获取地址列表失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

// 更新收货地址
exports.updateAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;
    const { receiverName, receiverPhone, province, city, district, detailAddress, isDefault } = req.body;

    const address = await MallAddress.findOne({
      where: { id: addressId, userId }
    });

    if (!address) {
      return res.status(404).json({
        code: 404,
        message: '地址不存在'
      });
    }

    // 如果设置为默认地址，先将其他地址设为非默认
    if (isDefault) {
      await MallAddress.update(
        { isDefault: false },
        { where: { userId } }
      );
    }

    // 更新地址信息
    await address.update({
      receiverName,
      receiverPhone,
      province,
      city,
      district,
      detailAddress,
      isDefault: isDefault || false
    });

    res.status(200).json({
      code: 200,
      message: '更新成功',
      data: address
    });
  } catch (error) {
    console.error('更新收货地址失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

// 删除收货地址
exports.deleteAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    const address = await MallAddress.findOne({
      where: { id: addressId, userId }
    });

    if (!address) {
      return res.status(404).json({
        code: 404,
        message: '地址不存在'
      });
    }

    await address.destroy();

    // 如果删除的是默认地址，则将最早创建的地址设为默认地址
    if (address.isDefault) {
      const firstAddress = await MallAddress.findOne({
        where: { userId },
        order: [['createTime', 'ASC']]
      });

      if (firstAddress) {
        await firstAddress.update({ isDefault: true });
      }
    }

    res.status(200).json({
      code: 200,
      message: '删除成功'
    });
  } catch (error) {
    console.error('删除收货地址失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

// 设置默认地址
exports.setDefaultAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    const address = await MallAddress.findOne({
      where: { id: addressId, userId }
    });

    if (!address) {
      return res.status(404).json({
        code: 404,
        message: '地址不存在'
      });
    }

    // 将其他地址设为非默认
    await MallAddress.update(
      { isDefault: false },
      { where: { userId } }
    );

    // 设置当前地址为默认
    await address.update({ isDefault: true });

    res.status(200).json({
      code: 200,
      message: '设置成功',
      data: address
    });
  } catch (error) {
    console.error('设置默认地址失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
}; 