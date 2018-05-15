function asyncMiddleware(controllerMethod) {
    return function(request, response, next) {
        Promise.resolve(controllerMethod(request, response, next)).catch(next);
    };
}

module.exports = asyncMiddleware;
