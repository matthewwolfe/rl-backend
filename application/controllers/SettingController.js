const HttpError = require('errors/HttpError');
const session = require('libraries/session');
const validation = require('libraries/validation');
const User = require('models/User');


class SettingController {

    async save(request, response) {
        const { id } = session.validateToken(request);

        validation.run(request.body, {
            gamertag: [{rule: validation.rules.isPresent}],
            psn: [{rule: validation.rules.isPresent}],
            steam: [{rule: validation.rules.isPresent}],
            switch: [{rule: validation.rules.isPresent}]
        });

        const { gamertag, psn, steam, switch: switchAccount } = request.body;

        let user = await User.findById(id);

        if (!user) {
            throw new HttpError('Unable to save settings.');
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
}

module.exports = SettingController;
