const Op = require('sequelize').Op;
const sequelize = require('database');
const HttpError = require('errors/HttpError');
const array = require('libraries/array');
const session = require('libraries/session');
const Message = require('models/Message');
const User = require('models/User');


class MessageController {

    async conversations(request, response) {
        const { id } = session.validateToken(request);

        const messages = await Message.findAll({
            where: {
                [Op.or]: [{userId: id}, {recipientId: id}]
            }
        });

        const userQuery = `
            SELECT users.*
            FROM users, messages
            WHERE (users.id = messages.userId AND users.id != ${id})
            OR (users.id = messages.recipientId AND users.id != ${id})
        `;

        const users = await sequelize.query(userQuery, {model: User});

        response.json({
            messages: array.keyBy(messages, 'id'),
            users: array.keyBy(users, 'id')
        });
    }

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
