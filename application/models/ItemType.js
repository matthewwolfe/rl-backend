const Sequelize = require('sequelize');
const sequelize = require('application/database');


const ItemType = sequelize.define('itemTypes', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

module.exports = ItemType;
