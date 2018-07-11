import { session } from 'libraries/session';
import { validation } from 'libraries/validation';


class SettingController
{
    async save(request, response)
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
}

export default SettingController;
