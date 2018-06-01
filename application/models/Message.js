const Sequelize = require('sequelize');
const sequelize = require('database');


const Message = sequelize.define('messages', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    userId: Sequelize.INTEGER,
    recipientId: Sequelize.INTEGER,
    message: Sequelize.TEXT,
    read: Sequelize.BOOLEAN,
    readAt: Sequelize.DATE,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

module.exports = Message;
