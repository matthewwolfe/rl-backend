require('dotenv').config();
import { DB } from 'active-record-js';
import express from 'express';
import WebSocket from 'ws';
import apiRoutes from 'routes/api';
import webRoutes from 'routes/web';
import websocket from 'websocket';


DB.create('127.0.0.1', process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_HOST);


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
