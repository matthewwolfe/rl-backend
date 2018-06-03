const Sequelize = require('sequelize');
const sequelize = require('database');


const BannedAccount = sequelize.define('bannedAccounts', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    platform: Sequelize.ENUM('', 'pc', 'ps4', 'switch', 'xbox'),
    account: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

module.exports = BannedAccount;
