import { Model, model } from 'active-record-js';


@model
class Item extends Model
{
    public static table = 'items';
}

export default Item;
