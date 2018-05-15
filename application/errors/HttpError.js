class HttpError {

    constructor(errors, status = 400) {
        this.errors = errors;
        this.status = status;
    }

    toString() {
        return this.errors.toString();
    }
}

HttpError.prototype = new Error();

module.exports = HttpError;
