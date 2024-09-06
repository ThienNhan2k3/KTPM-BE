const PlayTimeReportService = require("../services/playTimeReportService");

class PlayTimeReportController {
    static async getPlayTimeInAllGame(req, res) {
        const {start_time, end_time} = req.body;
        console.log(start_time, " ", end_time)

        return res.json({
            code: 200,
            metadata: await PlayTimeReportService.findAllPlayTimeInPeriod(start_time, end_time)
        }) 
    }
}

module.exports = PlayTimeReportController;