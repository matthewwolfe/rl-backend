const HttpError = require('errors/HttpError');
const array = require('libraries/array');
const session = require('libraries/session');
const view = require('libraries/view');
const Certification = require('models/Certification');
const Color = require('models/Color');
const Crate = require('models/Crate');
const Item = require('models/Item');
const ItemType = require('models/ItemType');
const Rarity = require('models/Rarity');
const User = require('models/User');


class AppController {

    index(request, response) {
        view(response, 'index.html', {
            FRONTEND_URL: process.env.FRONTEND_URL
        });
    }

    async initialize(request, response) {
        const { id } = session.validateToken(request);

        const user = await User.findById(id);
        const certifications = await Certification.all();
        const colors = await Color.all();
        const crates = await Crate.all();
        const items = await Item.all();
        const itemTypes = await ItemType.all();
        const rarities = await Rarity.all();

        response.json({
            certifications: array.keyBy(certifications, 'id'),
            colors: array.keyBy(colors, 'id'),
            crates: array.keyBy(crates, 'id'),
            items: array.keyBy(items, 'id'),
            itemTypes: array.keyBy(itemTypes, 'id'),
            rarities: array.keyBy(rarities, 'id'),
            user: user
        });
    }
}

module.exports = AppController;
