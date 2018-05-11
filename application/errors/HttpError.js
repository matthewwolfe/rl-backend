class HttpError {

    constructor(errors) {
        this.errors = errors;
        this.status = 400;
    }

    toString() {
        return this.errors.toString();
    }
}

HttpError.prototype = new Error();

module.exports = HttpError;
