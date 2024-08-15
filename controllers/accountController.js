const { Account } = require('../models');

// Get all accounts
exports.getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.findAll();
        return res.json(accounts);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Create an account
exports.createAccount = async (req, res) => {
    const { name, email, password, phone, status } = req.body;
    try {
        const account = await Account.create({ name, email, password, phone, status });
        return res.json(account);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Find an account by UUID
exports.getAccountByUUID = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const account = await Account.findOne({
            where: { uuid },
        });
        return res.json(account);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Update an account
exports.updateAccount = async (req, res) => {
    const uuid = req.params.uuid;
    const { name, email, password, phone, status } = req.body;
    try {
        const account = await Account.findOne({
            where: { uuid },
        });
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        account.name = name;
        account.email = email;
        account.password = password;
        account.phone = phone;
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
    const uuid = req.params.uuid;
    try {
        const account = await Account.findOne({
            where: { uuid },
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
