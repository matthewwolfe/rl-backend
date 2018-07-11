import { HttpError } from 'errors/HttpError';
import { ValidationError } from 'errors/ValidationError';


export default function(error: any, request, response, next)
{
    if (error instanceof ValidationError || error instanceof HttpError) {
        response.status(error.status).send(error);
    }
    else {
        throw error;
        response.status(500).send('Something went wrong.');
    }
}
