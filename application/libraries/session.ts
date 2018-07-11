import jwt from 'jsonwebtoken';
import { HttpError } from 'errors/HttpError';
import { User } from 'models';


async function getUser(structure)
{
    const { id } = validateToken(structure);
    const user = await User.findById(id);

    if (!user) {
        throw new HttpError('Unable to validate user', 401);
    }

    return user;
}

function validateToken(structure): any
{
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



export const session = {
    getUser,
    validateToken
};
