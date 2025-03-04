const sequelize = require('../config/database');

async function checkTables() {
  try {
    console.log('Checking database connection...');
    await sequelize.authenticate();
    console.log('Database connection is OK.');

    console.log('\nChecking database tables...');
    const [tables] = await sequelize.query(`
      SELECT table_name, table_rows
      FROM information_schema.tables 
      WHERE table_schema = 'elemall_data'
      ORDER BY table_name
    `);

    if (tables.length === 0) {
      console.log('No tables found in the database!');
    } else {
      console.log('Found tables:');
      tables.forEach(table => {
        console.log(`- ${table.table_name} (${table.table_rows || 0} rows)`);
      });
    }

    console.log('\nChecking mall-related tables...');
    const [mallTables] = await sequelize.query(`
      SELECT table_name, table_rows
      FROM information_schema.tables 
      WHERE table_schema = 'elemall_data'
      AND table_name LIKE 'mall_%'
      ORDER BY table_name
    `);

    if (mallTables.length === 0) {
      console.log('No mall-related tables found!');
    } else {
      console.log('Found mall-related tables:');
      for (const table of mallTables) {
        console.log(`\nTable: ${table.table_name}`);
        const [columns] = await sequelize.query(`
          SHOW COLUMNS FROM ${table.table_name}
        `);
        console.log('Columns:');
        columns.forEach(col => {
          console.log(`- ${col.Field} (${col.Type})`);
        });
      }
    }

  } catch (error) {
    console.error('Error checking tables:', error);
    if (error.parent) {
      console.error('Original error:', error.parent.message);
    }
  } finally {
    await sequelize.close();
  }
}

checkTables(); 