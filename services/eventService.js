const {Event} = require('../models');
const ErrorResponse = require('../core/errorResponse');

class EventService {
    static async findAll() {
        return Event.findAll();
    }

    static async findQuizById(id) {
        return Event.findOne({
            where: { id: id, type: "Quiz"}
        })
    }
}

module.exports = EventService;