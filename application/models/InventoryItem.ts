import { Model, model } from 'active-record-js';


@model
class InventoryItem extends Model
{
    public static table = 'inventoryItems';
}

export default InventoryItem;
