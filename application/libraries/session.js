const jwt = require('jsonwebtoken');
const HttpError = require('errors/HttpError');


function validateToken(request) {
    const { token } = request.query;

    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    }
    catch (error) {
        throw new HttpError(error.message);
    }
}

module.exports = {
    validateToken
};
