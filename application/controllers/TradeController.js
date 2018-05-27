const constants = require('config/constants');
const HttpError = require('errors/HttpError');
const session = require('libraries/session');
const validation = require('libraries/validation');
const Trade = require('models/Trade');
const TradeItem = require('models/TradeItem');


class TradeController {

    async build(request, response) {
        const { id: userId } = session.validateToken(request);

        validation.run(request.query, {
            id: [{
                rule: validation.rules.isInt,
                options: {min: 1}
            }]
        });

        const { id } = request.query;

        const trade = await Trade.findById(id);

        if (!trade) {
            throw new HttpError('Unable to find trade.');
        }

        const tradeItems = await TradeItem.findAll({
            where: {
                tradeId: trade.id
            }
        });

        response.json({
            trade: trade,
            tradeItems: tradeItems
        });
    }

    async save(request, response) {
        session.validateToken(request);

        validation.run(request.body, {
            id: [{
                rule: validation.rules.isInt
            }],
            description: [{
                rule: validation.rules.isPresent
            }],
            platform: [{
                rule: validation.rules.isIn,
                options: constants.PLATFORMS
            }]
        });

        const { id, description, platform, tradeItems } = request.body;

        let trade = Trade.build({});

        if (id) {
            trade = Trade.findById(id);
        }

        trade.description = description;
        trade.platform = platform;
        trade = await trade.save();

        response.json({
            trade: trade
        });
    }
}

module.exports = TradeController;
