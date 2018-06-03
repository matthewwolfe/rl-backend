const Sequelize = require('sequelize');
const sequelize = require('database');


const BlockedUser = sequelize.define('blockedUsers', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    userId: Sequelize.INTEGER,
    blockedUserId: Sequelize.INTEGER,
    reason: Sequelize.TEXT,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

module.exports = BlockedUser;
