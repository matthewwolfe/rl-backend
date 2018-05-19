const Sequelize = require('sequelize');
const sequelize = require('database');


const InventoryItem = sequelize.define('inventoryItem', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    userId: Sequelize.INTEGER,
    itemId: Sequelize.INTEGER,
    certificationId: Sequelize.INTEGER,
    colorId: Sequelize.INTEGER,
    crateId: Sequelize.INTEGER,
    rarityId: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER,
    tradeable: Sequelize.BOOLEAN,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

module.exports = InventoryItem;
