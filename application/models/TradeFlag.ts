import { Model, model } from 'active-record-js';


@model
class TradeFlag extends Model
{
    public static table = 'tradeFlags';
}

export default TradeFlag;
