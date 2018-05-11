const HttpError = require('application/errors/HttpError');
const ValidationError = require('application/errors/ValidationError');


function apiErrorHandler(error, request, response, next) {
    if (error instanceof ValidationError || error instanceof HttpError) {
        response.status(error.status).send(error);
    }

    throw error;
    response.status(500).send('Something went wrong.');
}

module.exports = apiErrorHandler;
