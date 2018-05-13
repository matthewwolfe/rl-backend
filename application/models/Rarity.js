const Sequelize = require('sequelize');
const sequelize = require('application/database');


const Rarity = sequelize.define('rarities', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

module.exports = Rarity;
