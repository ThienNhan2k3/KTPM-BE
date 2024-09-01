const {User, User_Event} = require('../models');
const ErrorResponse = require('../core/errorResponse');

class UserService {
    static async findAll() {
        return User.findAll();
    }

    static async findById(id) {
        return User.findOne({
            where: { id: id} 
        })
    }
    static async findPlayerWithTicketOfEventById(userId, eventId) {
        return User.findOne({
            where: { id: userId, type: "Người chơi"},
            include: [{
                model: User_Event,
                where: {
                    id_event: eventId
                }
            }]
        })
    }

}

module.exports = UserService;