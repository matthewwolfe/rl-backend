const Message = require('models/Message');
const actions = require('websocket/actions');


class MessageController {

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
