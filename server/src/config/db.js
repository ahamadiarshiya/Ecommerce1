const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'root', '1234567890', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, 
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to MySQL database.');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
})();

module.exports = sequelize;
