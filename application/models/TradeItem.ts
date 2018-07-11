import { Model, model } from 'active-record-js';


@model
class TradeItem extends Model
{
    public static table = 'tradeItems';
}

export default TradeItem;
