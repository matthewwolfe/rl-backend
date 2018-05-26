const constants = require('config/constants');
const session = require('libraries/session');
const validation = require('libraries/validation');


class TradeController {

    async save(request, response) {
        session.validateToken(request);

        validation.run(request.body, {
            platform: [{
                rule: validation.rules.isIn,
                options: constants.PLATFORMS
            }]
        });

        const { description, platform, tradeItems } = request.body;


    }
}

module.exports = TradeController;
