const Controller = require('application/core/Controller');


class AppController extends Controller {

    index(request, response) {
        super.view(response, 'index.html', {
            FRONTEND_URL: process.env.FRONTEND_URL
        });
    }

    initialize() {

    }
}

module.exports = AppController;
