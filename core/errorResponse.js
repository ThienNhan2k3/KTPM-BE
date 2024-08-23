const logger = require("../logger/winstonLog");


class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;

        //Log the error by using winston
        logger.error(`${this.status} - ${this.message}`)
    }
}

module.exports = ErrorResponse