const express = require('express');
const AppController = require('application/controllers/AppController');


const router = express.Router();

router.route('/').get(AppController.index);

module.exports = router;
