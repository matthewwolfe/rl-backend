const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const HttpError = require('application/errors/HttpError');
const validation = require('application/libraries/validation');
const User = require('application/models/User');


class UserController {

    async login(request, response) {
        validation.run(request.body, {
            email: [{rule: validator.isEmail}]
        });

        const { email, password } = request.body;

        const user = await User.scope('withPassword').findOne({
            where: {
                email: email
            }
        });

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new HttpError('Invalid login credentials.');
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY, {expiresIn: '24h'});

        response.json({
            token: token
        });
    }

    async signup(request, response) {
        validation.run(request.body, {
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
