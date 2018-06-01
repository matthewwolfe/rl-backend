const HttpError = require('errors/HttpError');
const array = require('libraries/array');
const session = require('libraries/session');
const SystemNotification = require('models/SystemNotification');


class SystemNotificationController {

    /**
     * Retrieves system notifications that are currently visible on the dashboard
     */
    async dashboard(request, response) {
        session.validateToken(request);

        const systemNotifications = await SystemNotification.findAll();

        response.json({
            systemNotifications: array.keyBy(systemNotifications, 'id')
        });
    }
}

module.exports = SystemNotificationController;
