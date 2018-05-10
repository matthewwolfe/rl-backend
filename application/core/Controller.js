class Controller {

    view(response, path) {
        response.send(path);
    }
}

module.exports = Controller;
