const Sequelize = require('sequelize');
const sequelize = require('application/database');


const User = sequelize.define('users', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

module.exports = User;
