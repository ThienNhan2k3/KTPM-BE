const { where } = require('sequelize');
const { Voucher } = require('../models');

// Get all vouchers
exports.getAll = async (req, res) => {
    try {
        const vouchers = await Voucher.findAll();
        return res.json(vouchers);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Get all vouchers that still active
exports.getAll_active = async (req, res) => {
    try {
        const vouchers = await Voucher.findAll({
            where: {
                status: 'Active',
            }
        });
        return res.json(vouchers);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Create a voucher
exports.create = async (req, res) => {
    const { voucher_name, industry, password, email, phone, address, gps, status, time_update} = req.body;
    try {
        const f_voucher = await voucher.findOne({
            where: { email },
        });
        if (f_voucher) {
            return res.status(404).json({ error: 'This email already been used!' });
        } else {
            const  voucher = await voucher.create({ voucher_name, industry, password, email, phone, address, gps, status, time_update});
            return res.json(voucher);
        }
        
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Activate a voucher
exports.activate = async (req, res) => {
    const id = req.params.uuid;
    try {
        const voucher = await voucher.findOne({
            where: { id },
        });
        if (!voucher) {
            return res.status(404).json({ error: 'voucher not found' });
        }
        if (voucher.status === 'Active') {
            return res.status(400).json({ error: 'voucher is already active' });
        }

        voucher.status = 'Active';
        voucher.time_update = new Date(); // Update the time_update field to the current time
        await voucher.save();

        return res.json({ message: 'voucher activated successfully', voucher });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Find an voucher by UUID
exports.getByUUID = async (req, res) => {
    const id = req.params.uuid;
    try {
        const voucher = await voucher.findOne({
            where: { id },
        });
        return res.json(voucher);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Update an voucher
exports.update = async (req, res) => {
    const id = req.params.uuid;
    const { voucher_name, industry, password, email, phone, address, gps, status, time_update } = req.body;
    try {
        const voucher = await voucher.findOne({
            where: { id },
        });
        if (!voucher) {
            return res.status(404).json({ error: 'voucher not found' });
        }
        voucher.voucher_name = voucher_name;
        voucher.industry = industry;
        voucher.password = password;
        voucher.email = email;
        voucher.phone = phone;
        voucher.address = address;
        voucher.gps = gps;
        voucher.status = status;
        voucher.time_update = time_update;

        await voucher.save();
        return res.json(voucher);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Delete an voucher
exports.delete = async (req, res) => {
    const id = req.params.uuid;
    try {
        const voucher = await voucher.findOne({
            where: { id },
        });

        if (!voucher) {
            return res.status(404).json({ error: 'voucher not found' });
        }

        await voucher.destroy();
        return res.json({ message: 'voucher deleted successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
