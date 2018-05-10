class AppController extends Controller {

    index() {
        this.view('index.html');
    }

    initialize() {

    }
}

module.exports = new AppController();
