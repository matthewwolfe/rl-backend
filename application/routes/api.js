const express = require('express');
const UserController = require('application/controllers/UserController');
const apiErrorHandler = require('application/middleware/apiErrorHandler');


const router = express.Router();

router.route('/signup').post(new UserController().signup);

// Middleware
router.use(apiErrorHandler);

module.exports = router;
