import { session } from 'libraries/session';


class MessageController
{
    async conversations(request, response)
    {
        const user = await session.getUser(request);
        const messages = await user.messages().where('userId', '=', user.id).orWhere('recipientId', '=', user.id).get();

        response.json({
            messages: messages.keyBy('id'),
        });
    }

    async unreadCount(request, response)
    {
        const user = await session.getUser(request);
        const count = await user.messages().where('read', '=', false).count();

        response.json({
            count: count
        });
    }
}

export default MessageController;
