const GameService = require("../services/gameService");

class GameController {
    static async updateImageById(req, res, next) {
        const id = req.params.id || null;

        return res.status(200).json({
            code: 200,
            metadata: await GameService.updateById(id, 
                {image: req.file.path}
            )
        })
    }

    static async getAllGames(req, res, next) {
        return res.status(200).json({
            code: 200,
            metadata: await GameService.findAll()
        })
    }

    static async getGame(req, res, next) {
        const id = req.params.id || null;
        if (id == null) {
            throw new ErrorResponse("500", "Server Internal Error");
        }
        return res.status(200).json({
            code: 200,
            metadata: await GameService.findById(id)
        })
    }
}

module.exports = GameController;