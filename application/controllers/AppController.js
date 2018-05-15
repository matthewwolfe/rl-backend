const jwt = require('jsonwebtoken');
const validator = require('validator');
const HttpError = require('application/errors/HttpError');
const view = require('application/libraries/view');
const Certification = require('application/models/Certification');
const Color = require('application/models/Color');
const Rarity = require('application/models/Rarity');
const User = require('application/models/User');


class AppController {

    index(request, response) {
        view(response, 'index.html', {
            FRONTEND_URL: process.env.FRONTEND_URL
        });
    }

    async initialize(request, response) {
        const { token } = request.query;

        try {
            var { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

        }
        catch (error) {
            throw new HttpError(error.message);
        }

        const user = await User.findById(id);
        const certifications = await Certification.all();
        const colors = await Color.all();
        const rarities = await Rarity.all();

        response.json({
            certifications: certifications,
            colors: colors,
            rarities: rarities,
            user: user
        });
    }
}

module.exports = AppController;
