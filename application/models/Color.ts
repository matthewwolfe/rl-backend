import { Model, model } from 'active-record-js';


@model
class Color extends Model
{
    public static table = 'colors';
}

export default Color;
