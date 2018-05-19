require('dotenv').config();
const express = require('express');
const Sequelize = require('sequelize');
const apiRoutes = require('routes/api');
const webRoutes = require('routes/web');


const app = express();

app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', webRoutes);
app.use(express.static('views'));

app.listen(3000, () => {
    console.log('Server listening on port 3000');
})
