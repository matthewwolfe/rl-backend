require('dotenv').config();
const express = require('express');
const Sequelize = require('sequelize');
const apiRoutes = require('application/routes/api');
const webRoutes = require('application/routes/web');


const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'mysql'
});


const app = express();

app.use(express.json());
app.use(express.static('application/views'));

app.use('/api', apiRoutes);
app.use('/', webRoutes);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
})
