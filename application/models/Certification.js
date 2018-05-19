const Sequelize = require('sequelize');
const sequelize = require('database');


const Certification = sequelize.define('certifications', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

module.exports = Certification;
