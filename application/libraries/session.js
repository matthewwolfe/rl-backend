const jwt = require('jsonwebtoken');


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
