import { session } from 'libraries/session';
import { view } from 'libraries/view';
import { Certification, Color, Crate, Item, ItemType, Rarity, User } from 'models';


class AppController
{
    index(_, response)
    {
        view(response, 'index.html', {
            FRONTEND_URL: process.env.FRONTEND_URL
        });
    }

    async initialize(request, response)
    {
        const { id } = session.validateToken(request);

        const user = await User.findById(id);
        const certifications = await Certification.all();
        const colors = await Color.all();
        const crates = await Crate.all();
        const items = await Item.all();
        const itemTypes = await ItemType.all();
        const rarities = await Rarity.all();

        response.json({
            certifications: certifications.keyBy('id'),
            colors: colors.keyBy('id'),
            crates: crates.keyBy('id'),
            items: items.keyBy('id'),
            itemTypes: itemTypes.keyBy('id'),
            rarities: rarities.keyBy('id'),
            user: user
        });
    }
}

export default AppController;
