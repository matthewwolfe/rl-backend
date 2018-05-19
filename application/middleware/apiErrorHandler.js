const HttpError = require('errors/HttpError');
const ValidationError = require('errors/ValidationError');


function apiErrorHandler(error, request, response, next) {
    if (error instanceof ValidationError || error instanceof HttpError) {
        response.status(error.status).send(error);
    }
    else {
        throw error;
        response.status(500).send('Something went wrong.');
    }
}

module.exports = apiErrorHandler;
