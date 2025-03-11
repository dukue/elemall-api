const sequelize = require('../config/database');

async function addSalesColumn() {
  try {
    console.log('Checking database connection...');
    await sequelize.authenticate();
    console.log('Database connection is OK.');

    console.log('\nChecking if sales column exists in Products table...');
    const [columns] = await sequelize.query(`
      SHOW COLUMNS FROM Products LIKE 'sales'
    `);

    if (columns.length > 0) {
      console.log('Sales column already exists in Products table.');
    } else {
      console.log('Adding sales column to Products table...');
      await sequelize.query(`
        ALTER TABLE Products 
        ADD COLUMN sales INT DEFAULT 0 COMMENT '商品销量' AFTER images
      `);
      console.log('Sales column added successfully!');
    }

  } catch (error) {
    console.error('Error adding sales column:', error);
    if (error.parent) {
      console.error('Original error:', error.parent.message);
    }
  } finally {
    await sequelize.close();
  }
}

addSalesColumn(); 