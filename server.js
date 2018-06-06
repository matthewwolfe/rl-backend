require('dotenv').config();
const express = require('express');
const querystring = require('querystring');
const WebSocket = require('ws');
const websocket = require('websocket');
const apiRoutes = require('routes/api');
const webRoutes = require('routes/web');


const httpServer = express();
const webSocketServer = new WebSocket.Server({
    port: 8080
});

webSocketServer.on('connection', websocket.connection);

httpServer.use(express.json());
httpServer.use('/api', apiRoutes);
httpServer.use('/', webRoutes);
httpServer.use(express.static('views'));

httpServer.listen(3000, () => {
    console.log('Server listening on port 3000');
});
