const Validation = require('application/libraries/Validation');


class Controller {

    validate(data, ruleset) {
        const validator = new Validation();
        validator.run(data, ruleset);
    }
}

module.exports = Controller;
