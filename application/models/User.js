const Sequelize = require('sequelize');
const sequelize = require('database');


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
}, {
    defaultScope: {
        attributes: {
            exclude: ['password']
        }
    },
    scopes: {
        withPassword: {}
    }
});

module.exports = User;
