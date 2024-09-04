const { where } = require('sequelize');
const { Brand } = require('../models');

// Get all brands
exports.getAll = async (req, res) => {
    try {
        const brands = await Brand.findAll({
            where: { status: "Active" },
        });
        return res.json(brands);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Create a brand
exports.create = async (req, res) => {
    const { brand_name, industry, password, email, phone, address, gps, status, time_update} = req.body;
    try {
        const f_brand = await Brand.findOne({
            where: { email },
        });
        if (f_brand) {
            return res.status(404).json({ error: 'This email already been used!' });
        } else {
            const  brand = await Brand.create({ brand_name, industry, password, email, phone, address, gps, status, time_update});
            return res.json(brand);
        }
        
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Activate a brand
exports.activate = async (req, res) => {
    const id = req.params.uuid;
    try {
        const brand = await Brand.findOne({
            where: { id },
        });
        if (!brand) {
            return res.status(404).json({ error: 'Brand not found' });
        }
        if (brand.status === 'Active') {
            return res.status(400).json({ error: 'Brand is already active' });
        }

        brand.status = 'Active';
        brand.time_update = new Date(); // Update the time_update field to the current time
        await brand.save();

        return res.json({ message: 'Brand activated successfully', brand });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Find an brand by UUID
exports.getByUUID = async (req, res) => {
    const id = req.params.uuid;
    try {
        const brand = await Brand.findOne({
            where: { id },
        });
        return res.json(brand);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Update an brand
exports.update = async (req, res) => {
    const id = req.params.uuid;
    const { brand_name, industry, password, email, phone, address, gps, status, time_update } = req.body;
    try {
        const brand = await Brand.findOne({
            where: { id },
        });
        if (!brand) {
            return res.status(404).json({ error: 'brand not found' });
        }
        brand.brand_name = brand_name;
        brand.industry = industry;
        brand.password = password;
        brand.email = email;
        brand.phone = phone;
        brand.address = address;
        brand.gps = gps;
        brand.status = status;
        brand.time_update = time_update;

        await brand.save();
        return res.json(brand);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Delete an brand
exports.delete = async (req, res) => {
    const id = req.params.uuid;
    try {
        const brand = await Brand.findOne({
            where: { id },
        });

        if (!brand) {
            return res.status(404).json({ error: 'brand not found' });
        }

        await brand.destroy();
        return res.json({ message: 'brand deleted successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
