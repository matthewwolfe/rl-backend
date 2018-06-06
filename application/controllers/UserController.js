const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Op = require('sequelize').Op;
const HttpError = require('errors/HttpError');
const array = require('libraries/array');
const session = require('libraries/session');
const validation = require('libraries/validation');
const InventoryItem = require('models/InventoryItem');
const Trade = require('models/Trade');
const TradeItem = require('models/TradeItem');
const User = require('models/User');


class UserController {

    async changePassword(request, response) {
        const { id } = session.validateToken(request);

        validation.run(request.body, {
            password: [{
                rule: validation.rules.isLength,
                options: {min: 8}
            }],
            passwordConfirm: [{
                rule: validation.rules.isLength,
                options: {min: 8}
            }]
        });

        const { password, passwordConfirm } = request.body;

        if (password !== passwordConfirm) {
            throw new HttpError('The passwords do not match.');
        }

        let user = await User.findById(id);
        user.password = await bcrypt.hash(password, 10);
        user = await user.save();

        response.json({
            user: user
        });
    }

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

    async search(request, response) {
        const { id } = session.validateToken(request);

        validation.run(request.body, {
            username: [{rule: validation.rules.isPresent}]
        });

        const { username } = request.body;

        const users = await User.findAll({
            order: [
                ['username', 'ASC']
            ],
            where: {
                id: {
                    [Op.ne]: id
                },
                username: {
                    [Op.like]: `%${username}%`
                }
            }
        });

        response.json({
            users: users
        });
    }

    async signup(request, response) {
        validation.run(request.body, {
            email: [{rule: validation.rules.isEmail}],
            username: [{
                rule: validation.rules.isLength,
                options: {min: 6}
            }],
            password: [{
                rule: validation.rules.isLength,
                options: {min: 8}
            }],
            passwordConfirm: [{
                rule: validation.rules.isLength,
                options: {min: 8}
            }]
        });

        const { email, password, passwordConfirm, username } = request.body;

        if (password !== passwordConfirm) {
            throw new HttpError('The passwords do not match.');
        }

        const userWithEmail = await User.findOne({
            where: {
                email: email
            }
        });

        if (userWithEmail) {
            throw new HttpError('This email address is already in use.');
        }

        const userWithUsername = await User.findOne({
            where: {
                username: username
            }
        });

        if (userWithUsername) {
            throw new HttpError('This username is already in use.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email: email,
            password: hashedPassword,
            username: username
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
        const tradeItems = await TradeItem.findAll({
            where: {
                tradeId: trades.map(trade => trade.id)
            }
        });

        response.json({
            trades: array.keyBy(trades, 'id'),
            tradeItems: array.keyBy(tradeItems, 'id')
        });
    }
}

module.exports = UserController;
