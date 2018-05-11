const validator = require('validator');
const Controller = require('application/core/Controller');


class UserController extends Controller {

    signup(request, response) {
        super.validate(request.body, {
            email: [{rule: validator.isEmail}],
            password: [{
                rule: validator.isLength,
                options: {min: 8}
            }]
        });

        response.json(request.body);
    }
}

module.exports = UserController;
