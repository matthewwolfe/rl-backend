const actions = require('websocket/actions');
const router = require('websocket/router');
const MessageController = require('websocket/controllers/MessageController');


// Receiving routes
router.route(actions.RECEIVING.GET_UNREAD_MESSAGE_COUNT).toMethod(new MessageController().unreadCount);


module.exports = router;
