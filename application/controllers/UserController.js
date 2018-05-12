const bcrypt = require('bcrypt');
const validator = require('validator');
const Controller = require('application/core/Controller');
const User = require('application/models/User');


class UserController extends Controller {

    async login(request, response) {
        super.validate(request.body, {
            email: [{rule: validator.isEmail}]
        });

        const { email, password } = request.body;

        const user = await User.findOne({
            where: {
                email: email
            }
        });

        const isValid = await bcrypt.compare(password, user.password);

        response.json({
            user: user
        });
    }

    async signup(request, response) {
        super.validate(request.body, {
            email: [{rule: validator.isEmail}],
            password: [{
                rule: validator.isLength,
                options: {min: 8}
            }]
        });

        const { email, password } = request.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email: email,
            password: hashedPassword
        });

        response.json({
            user: user
        });
    }
}

module.exports = UserController;
