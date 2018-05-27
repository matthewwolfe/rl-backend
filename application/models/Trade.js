const Sequelize = require('sequelize');
const sequelize = require('database');


const Trade = sequelize.define('trades', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    userId: Sequelize.INTEGER,
    description: Sequelize.TEXT,
    platform: Sequelize.ENUM('', 'pc', 'ps4', 'switch', 'xbox'),
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

module.exports = Trade;
