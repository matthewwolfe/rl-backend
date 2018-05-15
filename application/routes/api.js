const express = require('express');
const AppController = require('application/controllers/AppController');
const UserController = require('application/controllers/UserController');
const apiErrorHandler = require('application/middleware/apiErrorHandler');
const asyncMiddleware = require('application/middleware/asyncMiddleware');


const router = express.Router();

router.route('/initialize').get(asyncMiddleware(new AppController().initialize));
router.route('/login').post(asyncMiddleware(new UserController().login));
router.route('/signup').post(asyncMiddleware(new UserController().signup));

// Middleware
router.use(apiErrorHandler);

module.exports = router;
