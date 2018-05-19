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
    certificationId: Sequelize.INTEGER,
    colorId: Sequelize.INTEGER,
    crateId: Sequelize.INTEGER,
    rarityId: Sequelize.INTEGER,
    type: Sequelize.ENUM('', 'have', 'want'),
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

module.exports = TradeItem;
