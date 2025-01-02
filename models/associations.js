const Category = require('./Category');
const CategoryTranslation = require('./CategoryTranslation');
const Language = require('./Language');

// 设置分类与翻译的关联关系
Category.hasMany(CategoryTranslation, { foreignKey: 'categoryId' });
CategoryTranslation.belongsTo(Category, { foreignKey: 'categoryId' });

// 设置翻译与语言的关联关系
CategoryTranslation.belongsTo(Language, { foreignKey: 'languageId' });
Language.hasMany(CategoryTranslation, { foreignKey: 'languageId' });

module.exports = {
  Category,
  CategoryTranslation,
  Language
}; 