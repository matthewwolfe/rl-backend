import { Model, model, relation } from 'active-record-js';


@model
class Trade extends Model
{
    public static table = 'trades';

    @relation
    public tradeItems()
    {
        return this.hasMany('TradeItem', 'tradeId');
    }
}

export default Trade;
