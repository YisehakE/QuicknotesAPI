class ApiError extends Error {

    constructor(status, msg) {
        super(msg);
        this.status = status;
    }
}

module.exports = ApiError;