const Category = require('./Category');
const CategoryTranslation = require('./CategoryTranslation');
const Language = require('./Language');
const ShipmentTracking = require('./ShipmentTracking');
const TrackingHistory = require('./TrackingHistory');
const Order = require('./Order');

// 设置分类与翻译的关联关系
Category.hasMany(CategoryTranslation, { foreignKey: 'categoryId' });
CategoryTranslation.belongsTo(Category, { foreignKey: 'categoryId' });

// 设置翻译与语言的关联关系
CategoryTranslation.belongsTo(Language, { foreignKey: 'languageId' });
Language.hasMany(CategoryTranslation, { foreignKey: 'languageId' });

// 设置关联关系
ShipmentTracking.belongsTo(Order, { foreignKey: 'orderId' });
Order.hasOne(ShipmentTracking, { foreignKey: 'orderId' });

ShipmentTracking.hasMany(TrackingHistory, { foreignKey: 'trackingId' });
TrackingHistory.belongsTo(ShipmentTracking, { foreignKey: 'trackingId' });

module.exports = {
  Category,
  CategoryTranslation,
  Language,
  ShipmentTracking,
  TrackingHistory,
  Order
}; 