const { Item} = require('../models');

// Get all items
exports.getAll = async (req, res) => {
    try {
        const items = await Item.findAll({
        });
        return res.json(items);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create an item
exports.create = async (req, res) => {
    const { id_event, name, image } = req.body;
    try {
        const item = await Item.create({
            id_event, 
            name, 
            image,
            time_update: new Date() // Set the current time for `time_update`
        });
        return res.json(item);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Find items by id_event
exports.getbyIdEvent = async (req, res) => {
    const id_event = req.params.uuid;
    try {
        const items = await Item.findAll({
            where: { id_event},
        });
        console.log("items:", items);
        return res.json(items);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update an item
exports.update = async (req, res) => {
    const id = req.params.uuid;
    const { id_event, name, image } = req.body;
    try {
        const item = await Item.findOne({
            where: { id },
        });
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        item.id_event = id_event; 
        item.name = name;
        item.image = image;

        await item.save();
        return res.json(item);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete an item
exports.delete = async (req, res) => {
    const id = req.params.uuid;
    try {
        const item = await Item.findOne({
            where: { id },
        });

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        await item.destroy();
        return res.json({ message: 'Item deleted successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
