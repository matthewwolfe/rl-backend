import { Model, model } from 'active-record-js';


@model
class BannedAccount extends Model
{
    public static table = 'bannedAccounts';
}

export default BannedAccount;
