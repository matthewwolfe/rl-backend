class ValidationError extends Error {

    public errors: Array<string>|string;
    public status: number;

    constructor(errors)
    {
        super();

        this.errors = errors;
        this.status = 400;

        Object.setPrototypeOf(this, ValidationError.prototype);
    }

    toString()
    {
        return this.errors.toString();
    }
}


export {
    ValidationError
};
