const { where } = require('sequelize');
const { Event, Account } = require('../models');


// Get all events
exports.getAll = async (req, res) => {
    try {
        const events = await Event.findAll();
        return res.json(events);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

//Create an event
exports.create = async (req, res) => {
    const { name, brand_id, started_date, end_date } = req.body;
    try {
        const brand = await Account.findOne({
            where: {
                uuid: brand_id,
            }
        })
        if(brand) {
            const event = await Event.create({ name, brand_id, started_date, end_date  });
            return res.json(event);
        } else return res.status(404).json({ error: 'Brand not found!' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};