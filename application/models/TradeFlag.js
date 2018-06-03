const Sequelize = require('sequelize');
const sequelize = require('database');


const TradeFlag = sequelize.define('tradeFlags', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    tradeId: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,
    reason: Sequelize.TEXT,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

module.exports = TradeFlag;
