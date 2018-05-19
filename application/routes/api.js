const express = require('express');
const AppController = require('controllers/AppController');
const InventoryController = require('controllers/InventoryController');
const TradeController = require('controllers/TradeController');
const UserController = require('controllers/UserController');
const apiErrorHandler = require('middleware/apiErrorHandler');
const asyncMiddleware = require('middleware/asyncMiddleware');


const router = express.Router();

router.route('/initialize').get(asyncMiddleware(new AppController().initialize));

router.route('/inventory/remove_item').post(asyncMiddleware(new InventoryController().removeItem));
router.route('/inventory/save_item').post(asyncMiddleware(new InventoryController().saveItem));

router.route('/login').post(asyncMiddleware(new UserController().login));
router.route('/signup').post(asyncMiddleware(new UserController().signup));
router.route('/trades/save').post(asyncMiddleware(new TradeController().save));

router.route('/users/inventory').get(asyncMiddleware(new UserController().inventory));
router.route('/users/trades').get(asyncMiddleware(new UserController().trades));

// Middleware
router.use(apiErrorHandler);

module.exports = router;
