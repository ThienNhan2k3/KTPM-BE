const {Play_Time_Report, Event, Brand} = require("../models");
const { Op } = require('@sequelize/core');

class PlayTimeReportService {
    static async findAllPlayTimeInPeriod(start_time, end_time) {
        const data =  await Play_Time_Report.findAll({
            include: [{
                model: Event,
                
            }],
            where: {
                start_time: {
                    [Op.gte]: start_time, 
                    [Op.lte]: end_time,   
                }
            }
        })
        // console.log(data);
        return data;
    }

    static async findTopRegularBrandInPeriod(start_time, end_time) {
        const data =  await Brand.findAll({
            group: "id",
            include: [{
                model: Event,
                
            }],
            where: {
                start_time: {
                    [Op.gte]: start_time, 
                    [Op.lte]: end_time,   
                }
            }
        })
        // console.log(data);
        return data;
    }
}
module.exports = PlayTimeReportService;