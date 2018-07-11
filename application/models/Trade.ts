import { Model, model } from 'active-record-js';


@model
class Trade extends Model
{
    public static table = 'trades';
}

export default Trade;
