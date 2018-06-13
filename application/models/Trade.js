const Sequelize = require('sequelize');
const sequelize = require('database');
const TradeItem = require('models/TradeItem');


const Trade = sequelize.define('trades', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    userId: Sequelize.INTEGER,
    description: Sequelize.TEXT,
    platform: Sequelize.ENUM('', 'pc', 'ps4', 'switch', 'xbox'),
    flagged: Sequelize.BOOLEAN,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

Trade.hasMany(TradeItem, {foreignKey: 'tradeId'});

module.exports = Trade;
