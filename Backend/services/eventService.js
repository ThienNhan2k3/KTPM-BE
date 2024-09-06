const {Event, User_Event} = require('../models');
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

    static async removeEventTicket(eventId, userId) {
        try {
            const userEvent = await User_Event.findOne({
                where: {
                    id_user: userId,
                    id_event: eventId
                }
            })
            if (userEvent.playthrough > 1) {
                userEvent.playthrough -= 1;
                await userEvent.save();
            } else {
                await userEvent.destroy();
            }
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    static async addEventTicket(eventId, userId, playthrough=1) {
        try {
            const [userEvent, created] = await User_Event.findOrCreate({
                where: {  
                    id_event: eventId, 
                    id_user: userId,
                },
                defaults: {
                    id_event: eventId, 
                    id_user: userId,
                    playthrough,
                    time_update: new Date()
                },  
            })
            if (!created) {
                userEvent.playthrough += playthrough;
                await userEvent.save();
            }
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }

    }
}

module.exports = EventService;