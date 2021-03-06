import { constants } from 'config/constants';
import { HttpError } from 'errors/HttpError';
import { session } from 'libraries/session';
import { validation } from 'libraries/validation';
import { Trade, TradeFlag, TradeItem } from 'models';


class TradeController
{
    async build(request, response)
    {
        const user = await session.getUser(request);

        validation.run(request.query, {
            id: [{
                rule: validation.rules.isInt,
                options: {min: 1}
            }]
        });

        const { id } = request.query;
        const trade = await user.trades().where('id', '=', id).first();

        if (!trade) {
            throw new HttpError('Unable to find trade.');
        }

        const tradeItems = await trade.tradeItems().get();

        response.json({
            trade: trade,
            tradeItems: tradeItems
        });
    }

    async delete(request, response)
    {
        const user = await session.getUser(request);

        validation.run(request.body, {
            id: [{rule: validation.rules.isInt}]
        });

        const { id } = request.body;

        const trade = await user.trades().where('id', '=', id).first();

        if (!trade) {
            throw new HttpError('Unable to find trade');
        }

        await trade.tradeItems().delete();
        await trade.delete();

        response.json({});
    }

    async flag(request, response)
    {
        const { id: userId } = session.validateToken(request);

        validation.run(request.body, {
            id: [{rule: validation.rules.isInt}],
            reason: [{rule: validation.rules.isPresent}]
        });

        const { id, reason } = request.body;

        const flagCount = await TradeFlag.where('tradeId', '=', id).where('userId', '=', userId).count();

        if (flagCount > 0) {
            throw new HttpError('Unable to flag trade that you have already flagged.');
        }

        const tradeFlag = new TradeFlag({
            reason: reason,
            tradeId: id,
            userId: userId
        });
        await tradeFlag.save();

        response.json({
            tradeFlag: tradeFlag
        });
    }

    async paginate(request, response)
    {
        const { id: userId } = session.validateToken(request);

        validation.run(request.body, {
            platform: [{rule: validation.rules.isPresent}],
            page: [{rule: validation.rules.isInt}],
            searchFilters: [{rule: validation.rules.isArray}],
            type: [{rule: validation.rules.isPresent}]
        });

        const { platform, page, searchFilters, type } = request.body;

        const query = TradeItem.select(['tradeItems.tradeId'])
            .distinct()
            .join('trades', 'tradeItems.tradeId', '=', 'trades.id')
            .where('trades.userId', '!=', userId);

        if (type) {
            query.where('tradeItems.type', '!=', type);
        }

        if (platform) {
            query.where('trades.platform', '=', platform);
        }

        searchFilters.forEach((searchFilter) => {
            for (const key in searchFilter) {
                if (searchFilter[key]) {
                    query.where(`tradeItems.${key}`, '=', searchFilter[key]);
                }
            }
        });

        const pagination = await query.paginate({limit: 10, page: page});
        const tradeIds = pagination.data.pluck('tradeId');

        let trades = [];
        let tradeItems: any = {};

        if (tradeIds.length > 0) {
            trades = await Trade.whereIn('id', tradeIds).get();
            tradeItems = await TradeItem.whereIn('tradeId', tradeIds).get();
            tradeItems = tradeItems.groupBy('tradeId');
        }

        response.json({
            trades: trades,
            tradeItems: tradeItems
        });
    }

    async save(request, response)
    {
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

        var trade: any = new Trade();
        var tradeItems = haveItems.concat(wantItems);

        if (id) {
            trade = await Trade.findById(id);
            await trade.tradeItems().delete();

            if (!trade) {
                throw new HttpError('Unable to save trade.');
            }
        }

        trade.description = description;
        trade.platform = platform;
        trade.userId = userId;
        await trade.save();

        tradeItems.forEach((tradeItem) => {
            const item = new TradeItem(tradeItem);
            item.tradeId = trade.id;
            item.save();
        });

        response.json({});
    }
}

export default TradeController;
