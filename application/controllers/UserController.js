const validator = require('validator');
const Controller = require('application/core/Controller');


class UserController extends Controller {

    login(request, response) {
        super.validate(request.body, {
            email: [{rule: validator.isEmail}]
        });

        const { email, password } = request.body;

        response.json({});
    }

    signup(request, response) {
        super.validate(request.body, {
            email: [{rule: validator.isEmail}],
            password: [{
                rule: validator.isLength,
                options: {min: 8}
            }]
        });

        const { email, password } = request.body;

        response.json({});
    }
}

module.exports = UserController;
