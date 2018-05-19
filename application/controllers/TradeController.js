const session = require('libraries/session');


class TradeController {

    async save(request, response) {
        session.validateToken(request);
    }
}

module.exports = TradeController;
