import { Model, model } from 'active-record-js';


@model
class Message extends Model
{
    public static table = 'messages';
}

export default Message;
