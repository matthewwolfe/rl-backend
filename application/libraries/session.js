const jwt = require('jsonwebtoken');
const HttpError = require('errors/HttpError');


function validateToken(structure) {
    let token = '';

    if (typeof structure === 'object') {
        token = structure.query.token;
    }
    else if (typeof structure === 'string') {
        token = structure;
    }

    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    }
    catch (error) {
        throw new HttpError(error.message, 401);
    }
}

module.exports = {
    validateToken
};
