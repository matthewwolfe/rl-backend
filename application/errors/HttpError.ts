class HttpError extends Error
{
    public errors: Array<string>|string;
    public status: number;

    constructor(errors, status = 400)
    {
        super();
        this.errors = errors;
        this.status = status;

        Object.setPrototypeOf(this, HttpError.prototype);
    }

    toString()
    {
        return this.errors.toString();
    }
}

export {
    HttpError
};
