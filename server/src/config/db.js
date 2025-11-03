const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test', 'root', '12345', {
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
