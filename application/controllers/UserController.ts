import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpError } from 'errors/HttpError';
import { session } from 'libraries/session';
import { validation } from 'libraries/validation';
import { TradeItem, User } from 'models';


class UserController
{
    async changePassword(request, response)
    {
        const user = await session.getUser(request);

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

        user.password = await bcrypt.hash(password, 10);
        await user.save();

        response.json({
            user: user
        });
    }

    async inventory(request, response)
    {
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

        const inventoryItems = await user.inventoryItems().get();

        response.json({
            inventoryItems: inventoryItems
        });
    }

    async login(request, response)
    {
        validation.run(request.body, {
            email: [
                {rule: validation.rules.isRequired},
                {rule: validation.rules.isEmail}
            ],
            password: [{rule: validation.rules.isRequired}]
        });

        const { email, password } = request.body;

        const user = await User.select(['*']).where('email', '=', email).first();
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new HttpError('Invalid login credentials.');
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY, {expiresIn: '24h'});

        response.json({
            token: token
        });
    }

    async saveSettings(request, response)
    {
        const user = await session.getUser(request);

        validation.run(request.body, {
            gamertag: [{rule: validation.rules.isPresent}],
            psn: [{rule: validation.rules.isPresent}],
            steam: [{rule: validation.rules.isPresent}],
            switch: [{rule: validation.rules.isPresent}]
        });

        const { gamertag, psn, steam, switch: switchAccount } = request.body;

        user.gamertag = gamertag;
        user.psn = psn;
        user.steam = steam;
        user.switch = switchAccount;
        await user.save();

        response.json({
            user: user
        });
    }

    async search(request, response)
    {
        const { id } = session.validateToken(request);

        validation.run(request.body, {
            username: [{rule: validation.rules.isPresent}]
        });

        const { username } = request.body;

        const users = await User.select(['*'])
            .where('username', 'like', `%${username}%`)
            .where('id', '!=', id)
            .orderBy('username', 'ASC')
            .get();

        response.json({
            users: users
        });
    }

    async signup(request, response)
    {
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

        const userWithEmail = await User.select(['*']).where('email', '=', email).first();

        if (userWithEmail) {
            throw new HttpError('This email address is already in use.');
        }

        const userWithUsername = await User.select(['*']).where('username', '=', username).first();

        if (userWithUsername) {
            throw new HttpError('This username is already in use.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email: email,
            password: hashedPassword,
            username: username
        });
        await user.save();

        response.json({
            user: user
        });
    }

    // Retrieves all trades for a user
    async trades(request, response)
    {
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

        let tradeItems: any = {};
        const trades = await user.trades().get();

        if (trades.length > 0) {
            tradeItems = await TradeItem.whereIn('tradeId', trades.pluck('id')).get();
            tradeItems = tradeItems.keyBy('id');
        }

        response.json({
            trades: trades.keyBy('id'),
            tradeItems: tradeItems
        });
    }
}

export default UserController;
