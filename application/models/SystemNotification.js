const Sequelize = require('sequelize');
const sequelize = require('database');


const SystemNotification = sequelize.define('systemNotifications', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    title: Sequelize.TEXT,
    message: Sequelize.TEXT,
    startDate: Sequelize.DATEONLY,
    endDate: Sequelize.DATEONLY,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

module.exports = SystemNotification;
