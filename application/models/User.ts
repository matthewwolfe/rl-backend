import { Model, model, relation } from 'active-record-js';


@model
class User extends Model
{
    public static table = 'users';

    @relation
    inventoryItems()
    {
        return this.hasMany('InventoryItem', 'userId');
    }

    @relation
    messages()
    {
        return this.hasMany('Message', 'userId');
    }

    @relation
    trades()
    {
        return this.hasMany('Trade', 'userId');
    }
}

export default User;
