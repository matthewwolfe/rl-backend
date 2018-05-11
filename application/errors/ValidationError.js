class ValidationError {

    constructor(errors) {
        this.errors = errors;
        this.status = 400;
    }

    toString() {
        return this.errors.toString();
    }
}

ValidationError.prototype = new Error();

module.exports = ValidationError;
