import { Model, model } from 'active-record-js';


@model
class BlockedUser extends Model
{
    public static table = 'blockedUsers';
}

export default BlockedUser;
