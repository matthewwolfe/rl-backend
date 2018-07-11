import { actions } from 'websocket/actions';
import { router } from 'websocket/router';
import MessageController from 'websocket/controllers/MessageController';


// Receiving routes
router.route(actions.RECEIVING.NEW_MESSAGE).toMethod(new MessageController().newMessage);
router.route(actions.RECEIVING.UNREAD_MESSAGE_COUNT).toMethod(new MessageController().unreadCount);


export default router;
