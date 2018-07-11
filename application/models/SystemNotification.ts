import { Model, model } from 'active-record-js';


@model
class SystemNotification extends Model
{
    public static table = 'systemNotifications';
}

export default SystemNotification;
