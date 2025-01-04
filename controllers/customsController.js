const { Op } = require('sequelize');
const CustomsClearance = require('../models/CustomsClearance');
const CustomsDocument = require('../models/CustomsDocument');
const Order = require('../models/Order');
const sequelize = require('../config/database');
const path = require('path');
const fs = require('fs').promises;

exports.getCustomsStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const clearance = await CustomsClearance.findOne({
      where: { orderId: id },
      include: [{
        model: Order,
        attributes: ['orderNo']
      }]
    });

    if (!clearance) {
      return res.status(404).json({
        code: 404,
        message: '未找到清关记录'
      });
    }

    res.json({
      code: 200,
      message: '获取清关状态成功',
      data: clearance
    });
  } catch (error) {
    console.error('Get customs status error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.updateCustomsStatus = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const { status, declarationNo, customsOffice, inspectionNotes } = req.body;

    const clearance = await CustomsClearance.findOne({
      where: { orderId: id }
    });

    if (!clearance) {
      return res.status(404).json({
        code: 404,
        message: '未找到清关记录'
      });
    }

    // 验证状态流转
    const validTransitions = {
      pending: ['submitted'],
      submitted: ['inspecting', 'approved', 'rejected'],
      inspecting: ['approved', 'rejected'],
      approved: ['completed'],
      rejected: ['submitted'],
      completed: []
    };

    if (!validTransitions[clearance.status].includes(status)) {
      return res.status(400).json({
        code: 400,
        message: '无效的状态变更'
      });
    }

    await clearance.update({
      status,
      declarationNo,
      customsOffice,
      inspectionNotes,
      operatorId: req.user.id
    }, { transaction });

    await transaction.commit();

    res.json({
      code: 200,
      message: '更新清关状态成功',
      data: clearance
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Update customs status error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.getCustomsDocuments = async (req, res) => {
  try {
    const { id } = req.params;

    const clearance = await CustomsClearance.findOne({
      where: { orderId: id }
    });

    if (!clearance) {
      return res.status(404).json({
        code: 404,
        message: '未找到清关记录'
      });
    }

    const documents = await CustomsDocument.findAll({
      where: { clearanceId: clearance.id },
      order: [['createTime', 'DESC']]
    });

    res.json({
      code: 200,
      message: '获取清关文件成功',
      data: documents
    });
  } catch (error) {
    console.error('Get customs documents error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.uploadCustomsDocument = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const { type, name } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        code: 400,
        message: '请上传文件'
      });
    }

    const clearance = await CustomsClearance.findOne({
      where: { orderId: id }
    });

    if (!clearance) {
      return res.status(404).json({
        code: 404,
        message: '未找到清关记录'
      });
    }

    // 移动文件到永久存储位置
    const uploadDir = path.join(__dirname, '../uploads/customs');
    await fs.mkdir(uploadDir, { recursive: true });
    
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}${ext}`;
    const filePath = path.join(uploadDir, fileName);
    
    await fs.rename(file.path, filePath);

    const document = await CustomsDocument.create({
      clearanceId: clearance.id,
      type,
      name: name || file.originalname,
      path: `uploads/customs/${fileName}`,
      uploaderId: req.user.id
    }, { transaction });

    await transaction.commit();

    res.status(201).json({
      code: 200,
      message: '上传清关文件成功',
      data: document
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Upload customs document error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
};

exports.downloadCustomsDocument = async (req, res) => {
  try {
    const { id } = req.params;

    // 查找文件记录
    const document = await CustomsDocument.findByPk(id);
    if (!document) {
      return res.status(404).json({
        code: 404,
        message: '文件不存在'
      });
    }

    // 构建文件的完整路径
    const filePath = path.join(__dirname, '..', document.path);

    // 设置文件名，处理中文文件名
    const fileName = encodeURIComponent(document.name);
    res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${fileName}`);
    
    // 发送文件
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error('Download file error:', err);
        // 如果文件已经开始传输，就不发送错误响应
        if (!res.headersSent) {
          res.status(500).json({
            code: 500,
            message: '文件下载失败'
          });
        }
      }
    });
  } catch (error) {
    console.error('Download customs document error:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误'
    });
  }
}; 