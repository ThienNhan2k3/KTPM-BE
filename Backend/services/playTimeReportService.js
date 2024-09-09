const {Play_Time_Report, Event, Brand} = require("../models");
const { Op, fn } = require('@sequelize/core');
const sequelize = require("sequelize");

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

    static async findTopRegularBrandInPeriod(start_time, end_time, type) {
        const where = {time_update: {
            [Op.gte]: start_time, 
            [Op.lte]: end_time,   
        }};
        if (type != "All") {
            where.type = type
        }
        console.log(type);
        let data =  await Brand.findAll({
            // attributes: ['id', "brand_name", [fn('COUNT', sequelize.col('Event')), 'EventCount']],
            include: [{
                model: Event,
                where,
                required: false
            }],
        })

        
        const brands = [];
        for (let i = 0; i < 10; i++) {
            brands.push({
                name: data[i].brand_name,
                events: data[i].Events.length
            });
        }
        console.log(brands);
        brands.sort(function(a, b){
            return b.events - a.events;
        });
        
        return brands.slice(0, 10);
    }
}
module.exports = PlayTimeReportService;