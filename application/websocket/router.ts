const routes = new Map();

// Handles an incoming message by retrieving the route and calling the method
function handleMessage(user, message, users) {
    const { type, data } = message;

    const method = routes.get(type);

    try {
        method(user, data, users);
    }
    catch (error) {
        console.log(error);
    }
}

// Adds an incoming route to the routes Map
function route(type) {
    if (routes.has(type)) {
        throw `Websocket router route already exists for the type: ${type}`;
    }

    return toMethod(type);
}

// Adds a method to the route before adding to the routes Map
function toMethod(type) {
    return {
        toMethod: (method) => routes.set(type, method)
    }
}

export const router = {
    handleMessage,
    route
};
