const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HttpError = require('errors/HttpError');
const session = require('libraries/session');
const validation = require('libraries/validation');
const InventoryItem = require('models/InventoryItem');
const Trade = require('models/Trade');
const User = require('models/User');


class UserController {

    async inventory(request, response) {
        session.validateToken(request);

        validation.run(request.query, {
            id: [{
                rule: validation.rules.isInt,
                options: {min: 1}
            }]
        });

        const { id } = request.query;
        const user = await User.findById(id);

        if (!user) {
            throw new HttpError('Unable to find user.', 404);
        }

        const inventoryItems = await InventoryItem.findAll({
            where: {
                userId: user.id
            }
        });

        response.json({
            inventoryItems: inventoryItems
        });
    }

    async login(request, response) {
        validation.run(request.body, {
            email: [
                {rule: validation.rules.isRequired},
                {rule: validation.rules.isEmail}
            ],
            password: [{rule: validation.rules.isRequired}]
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

    async saveSettings(request, response) {
        const { id } = session.validateToken(request);

        validation.run(request.body, {
            gamertag: [{rule: validation.rules.isPresent}],
            psn: [{rule: validation.rules.isPresent}],
            steam: [{rule: validation.rules.isPresent}],
            switch: [{rule: validation.rules.isPresent}]
        });

        const { gamertag, psn, steam, switch: switchAccount } = request.body;

        const user = await User.findById(id);

        if (!user) {
            throw new HttpError('Unable to save user settings');
        }

        user.gamertag = gamertag;
        user.psn = psn;
        user.steam = steam;
        user.switch = switchAccount;
        user = await user.save();

        response.json({
            user: user
        });
    }

    async signup(request, response) {
        validation.run(request.body, {
            email: [{rule: validation.rules.isEmail}],
            password: [{
                rule: validation.rules.isLength,
                options: {min: 8}
            }]
        });

        const { email, password } = request.body;

        const userWithEmail = await User.findOne({
            where: {
                email: email
            }
        });

        if (userWithEmail) {
            throw new HttpError('This email address is already in use.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email: email,
            password: hashedPassword
        });

        response.json({
            user: user
        });
    }

    // Retrieves all trades for a user
    async trades(request, response) {
        session.validateToken(request);

        validation.run(request.query, {
            id: [{
                rule: validation.rules.isInt,
                options: {min: 1}
            }]
        });

        const { id } = request.query;
        const user = await User.findById(id);

        if (!user) {
            throw new HttpError('Unable to find user.', 404);
        }

        const trades = await Trade.findAll({
            where: {
                userId: user.id
            }
        });

        response.json({
            trades: trades
        });
    }
}

module.exports = UserController;
