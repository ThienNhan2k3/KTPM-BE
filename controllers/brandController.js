const { Brand } = require('../models');

// Get all brands
exports.getAll = async (req, res) => {
    try {
        const brands = await Brand.findAll({
            attributes: ['id', 'brand_name', 'industry', 'email', 'phone', 'address', 'gps', 'status', 'time_update']});
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

// Find an account by UUID
exports.getAccountByUUID = async (req, res) => {
    const id = req.params.uuid;
    try {
        const account = await Account.findOne({
            where: { id },
        });
        return res.json(account);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Update an account
exports.updateAccount = async (req, res) => {
    const id = req.params.uuid;
    const { name, email, password, phone, type, status } = req.body;
    try {
        const account = await Account.findOne({
            where: { id },
        });
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        account.name = name;
        account.email = email;
        account.password = password;
        account.phone = phone;
        account.type = type;
        account.status = status;

        await account.save();
        return res.json(account);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Delete an account
exports.deleteAccount = async (req, res) => {
    const id = req.params.uuid;
    try {
        const account = await Account.findOne({
            where: { id },
        });

        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        await account.destroy();
        return res.json({ message: 'Account deleted successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
