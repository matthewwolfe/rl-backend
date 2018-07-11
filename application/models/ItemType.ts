import { Model, model } from 'active-record-js';


@model
class ItemType extends Model
{
    public static table = 'itemTypes';
}

export default ItemType;
