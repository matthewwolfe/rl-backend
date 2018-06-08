const constants = require('config/constants');
const session = require('libraries/session');
const Message = require('models/Message');
const router = require('websocket/routes');


let users = new Map();

class User {

    constructor(ws, id) {
        this.ws = ws;
        this.id = id;

        this.close = this.close.bind(this);
        this.message = this.message.bind(this);

        this.ws.on('close', this.close);
        this.ws.on('message', this.message);
    }

    close() {
        users.delete(this.id);
    }

    message(message) {
        router.handleMessage(this, JSON.parse(message), users);
    }

    send(type, data = {}) {
        this.ws.send(JSON.stringify({type: type, data: data}));
    }
}

function broadcast() {

}

function connection(ws, request) {
    const token = request.url.substring(request.url.indexOf('=') + 1);

    try {
        const { id } = session.validateToken(token);
    }
    catch (e) {
        // TODO: Don't allow websocket to connect if token is not valid, ie: expired, invalid.
        console.log(error);
        return;
    }

    const user = new User(ws, id);
    users.set(id, user);
}

function sendToUser(id, type, data) {
    if (!users.has(id)) {
        return;
    }

    const user = users.get(id);
    user.send(type, data);
}

module.exports = {
    broadcast,
    connection,
    sendToUser
};
