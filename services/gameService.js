const {Game} = require('../models');
const ErrorResponse = require('../core/errorResponse');

const {removeFile} = require("../utils/helper");

class GameService {
    static async updateById(id, data) {
        if (id == null) {
            throw new ErrorResponse("500", "Server Internal Error");
        }
        const game = await GameService.findById(id);
        if (game == null) {
            throw new ErrorResponse("500", "Server Internal Error");
        }

        if (data != null && data.image) {    
            removeFile(game.image);
        }
        

        await Game.update({
            ...data
        }, {
            where: {
                id,
            },
        })
        return GameService.findById(id);
    }

    static async findAll() {
        return Game.findAll();
    }

    static async findById(id) {
        return Game.findOne({
            where: { id: id} 
        })
    }
}

module.exports = GameService;