class APIFeatures {

    constructor(query, queryString) {
        this.query = query
        this.queryString = queryString

    }

    filter() {

        let queryObj = { ...this.queryString };
        const excludeFields = ['page', 'sort', 'limit', 'fields', 'search'];
        excludeFields.forEach((el) => delete queryObj[el]);

        let searchQuery = this.queryString.search;

        if (searchQuery) {
            const searchValue = searchQuery.split('-').join(' ')
            const searchRegExp = new RegExp(`${searchValue}`, 'i')

            const searchDate = new Date(searchValue);
            const firstDayOfYear = new Date(searchDate.getFullYear(), 0, 1);
            const lastDayOfYear = new Date(searchDate.getFullYear() + 1, 0, 0);

            // Base query that is always used
            const baseQuery = { fullName: { $regex: searchRegExp } };

            // Doesnt work?
            // if ('pesel' in this.query.model.schema.paths && searchValue === this.queryString.pesel) {
            //     baseQuery.pesel = { $regex: searchRegExp };
            // }
            // if ('city' in this.query.model.schema.paths && searchValue === this.queryString.city) {
            //     baseQuery.city = { $regex: searchRegExp };
            // }


            // Create the final query
            if (!isNaN(searchDate.getTime())) {
                // If searchValue is a date, add dateOfBirth to the query
                queryObj = {
                    $or: [
                        baseQuery,
                        { dateOfBirth: { $gte: firstDayOfYear, $lte: lastDayOfYear } }
                    ]
                };
            } else {
                // If not, use the base query
                queryObj = {
                    $or: [baseQuery]
                };
            }
        }



        this.query = this.query.find(queryObj)

        return this;
    }
    async count() {
        return await this.query.countDocuments();
    }


    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            console.log(sortBy)
            this.query = this.query.sort(sortBy)
        } else { //default
            this.query = this.query.sort({ fullName: 1 })
            //  || this.query.sort('date') ??
        }

        return this
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ')
            this.query = this.query.select(fields)
        } else {
            this.query = this.query.select('-__v')
        }
        return this
    }

    paginate() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 8
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)

        return this
    }

}

module.exports = APIFeatures