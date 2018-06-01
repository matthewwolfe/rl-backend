require('dotenv').config();
const express = require('express');
const WebSocket = require('ws');
const apiRoutes = require('routes/api');
const webRoutes = require('routes/web');


const httpServer = express();
const webSocketServer = new WebSocket.Server({
    port: 8080
});

webSocketServer.on('connection', (ws, request) => {
    console.log('here');
});

httpServer.use(express.json());
httpServer.use('/api', apiRoutes);
httpServer.use('/', webRoutes);
httpServer.use(express.static('views'));

httpServer.listen(3000, () => {
    console.log('Server listening on port 3000');
});
