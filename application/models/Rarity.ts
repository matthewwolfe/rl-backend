import { Model, model } from 'active-record-js';


@model
class Rarity extends Model
{
    public static table = 'rarities';
}

export default Rarity;
