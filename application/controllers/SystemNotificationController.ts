import { session } from 'libraries/session';
import { SystemNotification } from 'models';


class SystemNotificationController
{
    /**
     * Retrieves system notifications that are currently visible on the dashboard
     */
    async dashboard(request, response)
    {
        session.validateToken(request);
        const systemNotifications = await SystemNotification.all();

        response.json({
            systemNotifications: systemNotifications.keyBy('id')
        });
    }
}

export default SystemNotificationController;
