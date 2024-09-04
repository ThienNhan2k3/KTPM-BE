const { where } = require('sequelize');
const { Event } = require('../models');


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
    const { type, id_game, id_brand, name, image, start_time, end_time } = req.body;
    try {
        /*const brand = await event.findOne({
            where: {
                uuid: brand_id,
            }
        })
        if(brand) {
            const event = await Event.create({ name, brand_id, started_date, end_date  });
            return res.json(event);
        } else return res.status(404).json({ error: 'Brand not found!' });*/
        const new_event = await Event.create({
            type, id_game, id_brand, name, image, start_time, end_time,
            time_update: new Date(),
        });
        return res.json(new_event);
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
exports.update = async (req, res) => {
    const id = req.params.uuid;
    const { type, id_game, id_brand, name, image, start_time, end_time } = req.body;
    try {
        const update_event = await Event.findOne({
            where: { id },
        });
        if (!update_event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        update_event.name = name;
        update_event.image = image;
        update_event.start_time = start_time;
        update_event.end_time = end_time;
        update_event.time_update= new Date();

        await update_event.save();
        return res.json(update_event);
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