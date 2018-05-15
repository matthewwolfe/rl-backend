const express = require('express');
const AppController = require('application/controllers/AppController');


const router = express.Router();

router.route('*').get(new AppController().index);

module.exports = router;
