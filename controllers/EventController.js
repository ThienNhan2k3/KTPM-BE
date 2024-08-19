const { where } = require('sequelize');
const { Event, event } = require('../models');


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
        const brand = await event.findOne({
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

// Find an event by UUID
exports.getByUUID = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const event = await Event.findOne({
            where: { uuid },
        });

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        return res.json(event);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Update an event
exports.updateAccount = async (req, res) => {
    const uuid = req.params.uuid;
    const { name, brand_id, started_date, end_date } = req.body;
    try {
        const event = await Event.findOne({
            where: { uuid },
        });

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        event.name = name;
        event.brand_id = brand_id;
        event.started_date = started_date;
        event.end_date = end_date;

        await event.save();
        return res.json(event);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Delete an event
exports.deleteAccount = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const event = await Event.findOne({
            where: { uuid },
        });

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        await event.destroy();
        return res.json({ message: 'Event deleted successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};