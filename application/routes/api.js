const express = require('express');
const AppController = require('controllers/AppController');
const InventoryController = require('controllers/InventoryController');
const MessageController = require('controllers/MessageController');
const SettingController = require('controllers/SettingController');
const SystemNotificationController = require('controllers/SystemNotificationController');
const TradeController = require('controllers/TradeController');
const UserController = require('controllers/UserController');
const apiErrorHandler = require('middleware/apiErrorHandler');
const asyncMiddleware = require('middleware/asyncMiddleware');


const router = express.Router();

router.route('/change_password').post(asyncMiddleware(new UserController().changePassword));
router.route('/initialize').get(asyncMiddleware(new AppController().initialize));
router.route('/inventory/remove_item').post(asyncMiddleware(new InventoryController().removeItem));
router.route('/inventory/save_item').post(asyncMiddleware(new InventoryController().saveItem));
router.route('/login').post(asyncMiddleware(new UserController().login));
router.route('/messages/conversations').get(asyncMiddleware(new MessageController().conversations));
router.route('/messages/unread_count').get(asyncMiddleware(new MessageController().unreadCount));
router.route('/settings/save').post(asyncMiddleware(new SettingController().save));
router.route('/signup').post(asyncMiddleware(new UserController().signup));
router.route('/system_notifications/dashboard').get(asyncMiddleware(new SystemNotificationController().dashboard));
router.route('/trades/build').get(asyncMiddleware(new TradeController().build));
router.route('/trades/delete').post(asyncMiddleware(new TradeController().delete));
router.route('/trades/flag').post(asyncMiddleware(new TradeController().flag));
router.route('/trades/paginate').post(asyncMiddleware(new TradeController().paginate));
router.route('/trades/save').post(asyncMiddleware(new TradeController().save));
router.route('/users/inventory').get(asyncMiddleware(new UserController().inventory));
router.route('/users/search').post(asyncMiddleware(new UserController().search));
router.route('/users/trades').get(asyncMiddleware(new UserController().trades));

// Middleware
router.use(apiErrorHandler);

module.exports = router;
