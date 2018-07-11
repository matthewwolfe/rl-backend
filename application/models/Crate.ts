import { Model, model } from 'active-record-js';


@model
class Crate extends Model
{
    public static table = 'crates';
}

export default Crate;
