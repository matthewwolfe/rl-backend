const HttpError = require('errors/HttpError');
const session = require('libraries/session');
const Message = require('models/Message');


class MessageController {

    async unreadCount(request, response) {
        const { id } = session.validateToken(request);

        const count = await Message.count({
            where: {
                recipientId: id,
                read: false
            }
        });

        response.json({
            count: count
        });
    }
}

module.exports = MessageController;
