import { Message, User } from 'models';
import { actions } from 'websocket/actions';


class MessageController
{

    async newMessage(user, data, users)
    {
        const { message, recipientId } = data;

        const recipientUser = await User.findById(recipientId);

        const newMessage = new Message({
            message: message,
            recipientId: recipientUser.id,
            userId: user.id
        });
        await newMessage.save();

        if (users.has(recipientId)) {
            users.get(recipientId).send(actions.SENDING.NEW_MESSAGE, {
                message: newMessage
            });
        }

        user.send(actions.SENDING.NEW_MESSAGE, {
            message: newMessage
        });
    }

    async unreadCount(socketUser)
    {
        const user = await User.findById(socketUser.id);
        const count = await user.messages().where('read', '=', false).count();

        socketUser.send(actions.SENDING.UNREAD_MESSAGE_COUNT, {
            count: count
        });
    }
}

export default MessageController;
