class Pagination {

    constructor(Model, options, query) {
        if (!options.hasOwnProperty('page')) {
            throw 'Pagination is missing the required option: page';
        }

        this._Model = Model;
        this._query = Object.assign({}, query);

        this.data = [];
        this.lastPage;
        this.limit = 15;
        this.page = options.page;
        this.total;

        if (options.hasOwnProperty('limit')) {
            this.limit = options.limit;
        }
    }

    ids() {
        return this.data.map(model => model.id);
    }

    async paginate() {
        this.total = await this._Model.count({
            ...this._query
        });

        this.data = await this._Model.findAll({
            ...this._query,
            limit: this.limit,
            offset: this.limit * (this.page - 1)
        });

        this.lastPage = Math.ceil(this.total / this.limit);
    }

    results() {
        return {
            data: this.data,
            lastPage: this.lastPage,
            limit: this.limit,
            page: this.page,
            total: this.total
        };
    }
}

module.exports = Pagination;
