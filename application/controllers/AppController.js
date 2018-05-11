const Controller = require('application/core/Controller');


class AppController extends Controller {

    index(request, response) {
        response.render('index.html');
    }

    initialize() {

    }
}

module.exports = AppController;
