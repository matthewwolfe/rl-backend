const Sequelize = require('sequelize');
const sequelize = require('database');


const TradeItem = sequelize.define('tradeItems', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    tradeId: Sequelize.INTEGER,
    itemId: Sequelize.INTEGER,
    certificationId: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    colorId: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    crateId: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    rarityId: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    type: Sequelize.ENUM('', 'have', 'want'),
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

module.exports = TradeItem;
