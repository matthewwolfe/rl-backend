const Sequelize = require('sequelize');


const sequelize = new Sequelize(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'mysql'
});

module.exports = sequelize;
