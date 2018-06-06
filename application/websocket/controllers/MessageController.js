const Message = require('models/Message');
const User = require('models/User');
const actions = require('websocket/actions');


class MessageController {

    async newMessage(user, data, users) {
        const { message, recipientId } = data;

        const recipientUser = await User.findById(recipientId);

        const newMessage = await Message.create({
            message: message,
            recipientId: recipientUser.id,
            userId: user.id
        });

        if (users.has(recipientId)) {
            users.get(recipientId).send(actions.SENDING.NEW_MESSAGE, {
                message: newMessage
            });
        }

        user.send(actions.SENDING.NEW_MESSAGE, {
            message: newMessage
        });
    }

    async unreadCount(user) {
        const count = await Message.count({
            where: {
                recipientId: user.id,
                read: false
            }
        });

        user.send(actions.SENDING.UNREAD_MESSAGE_COUNT, {
            count: count
        });
    }
}

module.exports = MessageController;
