const Op = require('sequelize').Op;
const sequelize = require('database');
const constants = require('config/constants');
const HttpError = require('errors/HttpError');
const array = require('libraries/array');
const Pagination = require('libraries/Pagination');
const session = require('libraries/session');
const validation = require('libraries/validation');
const Trade = require('models/Trade');
const TradeFlag = require('models/TradeFlag');
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

    async delete(request, response) {
        session.validateToken(request);

        validation.run(request.body, {
            id: [{rule: validation.rules.isInt}]
        });

        const { id } = request.body;

        await sequelize.transaction(async (transaction) => {
            await Trade.destroy({where: {id: id}}, {transaction: transaction});
            await TradeItem.destroy({where: {tradeId: id}}, {transaction: transaction});
        });

        response.json({});
    }

    async flag(request, response) {
        const { id: userId } = session.validateToken(request);

        validation.run(request.body, {
            id: [{rule: validation.rules.isInt}],
            reason: [{rule: validation.rules.isPresent}]
        });

        const { id, reason } = request.body;

        const flagCount = await TradeFlag.count({
            where: {
                tradeId: id,
                userId: userId
            }
        });

        if (flagCount > 0) {
            throw new HttpError('Unable to flag trade that you have already flagged.');
        }

        const tradeFlag = await TradeFlag.create({
            reason: reason,
            tradeId: id,
            userId: userId
        });

        response.json({
            tradeFlag: tradeFlag
        });
    }

    async paginate(request, response) {
        const { id: userId } = session.validateToken(request);

        validation.run(request.body, {
            page: [{
                rule: validation.rules.isInt,
                options: {min: 1}
            }],
            platform: [{rule: validation.rules.isPresent}],
            searchFilters: [{rule: validation.rules.isPresent}],
            type: [{
                rule: validation.rules.isIn,
                options: ['have', 'want']
            }]
        });

        const { page, platform, searchFilters, type } = request.body;

        const tradeWhere = {};
        const tradeItemsWhere = {
            type: type
        };

        searchFilters.forEach((searchFilter) => {
            for (const key in searchFilter) {
                if(searchFilter[key]) {
                    tradeItemsWhere[key] = searchFilter[key];
                }
            }
        });

        if (platform) {
            tradeWhere.platform = platform;
        }

        const sql = `
            SELECT DISTINCT(tradeItems.tradeId)
            FROM tradeItems, trades
            WHERE tradeItems.tradeId = trades.id
            AND tradeItems.type = ?
            LIMIT 10
            OFFSET
        `;

        const pagination = new Pagination(Trade, {page: page}, {
            include: [
                {
                    model: TradeItem,
                    where: tradeItemsWhere
                }
            ],
            order: [
                ['updatedAt', 'DESC']
            ],
            where: tradeWhere
        });

        await pagination.paginate();

        response.json({
            sql
        });
    }

    async save(request, response) {
        const { id: userId } = session.validateToken(request);

        validation.run(request.body, {
            id: [{rule: validation.rules.isInt}],
            description: [{rule: validation.rules.isPresent}],
            haveItems: [{rule: validation.rules.isArray}],
            platform: [{
                rule: validation.rules.isIn,
                options: constants.PLATFORMS
            }],
            wantItems: [{rule: validation.rules.isArray}]
        });

        const { id, description, haveItems, platform, wantItems } = request.body;

        haveItems.forEach(item => item.type = 'have');
        wantItems.forEach(item => item.type = 'want');

        var trade = Trade.build({});
        var tradeItems = haveItems.concat(wantItems);

        if (id) {
            trade = await Trade.findById(id);

            if (!trade) {
                throw new HttpError('Unable to save trade.');
            }
        }

        trade.description = description;
        trade.platform = platform;
        trade.userId = userId;

        await sequelize.transaction(async (transaction) => {

            // Delete existing trade items
            await TradeItem.destroy({where: {tradeId: trade.id}}, {transaction: transaction});

            // Save or update trade
            trade = await trade.save({transaction: transaction});

            // Add the trade id to trade items, then save those
            tradeItems.forEach(tradeItem => tradeItem.tradeId = trade.id);
            await TradeItem.bulkCreate(tradeItems);
        });

        tradeItems = await TradeItem.findAll({
            where: {
                tradeId: trade.id
            }
        });

        response.json({
            trade: trade,
            tradeItems: tradeItems
        });
    }
}

module.exports = TradeController;
