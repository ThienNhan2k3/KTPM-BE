const {Game} = require('../models');
const ErrorResponse = require('../core/errorResponse');

const {removeFile} = require("../utils/helper");

class GameReportService {

    static async findAll() {
        return Game.findAll();
    }
}

module.exports = GameReportService;