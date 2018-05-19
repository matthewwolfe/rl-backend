const Sequelize = require('sequelize');
const sequelize = require('database');


const Item = sequelize.define('items', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: Sequelize.STRING,
    itemTypeId: Sequelize.INTEGER,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

module.exports = Item;
