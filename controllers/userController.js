const { User } = require('../models');

// Get all users
exports.getAll = async (req, res) => {
    try {
        const users = await User.findAll({
            where: {
                type: "Người chơi"
            }
        });
        return res.json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create a user
exports.createuser = async (req, res) => {
    const { full_name, email, password, phone, type, status, user_name, avatar } = req.body;
    try {
        const existingUser = await User.findOne({
            where: { phone },
        });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists!' });
        } else {
            const newUser = await User.create({ full_name, email, password, phone, type, status, user_name, avatar, time_update: new Date() });
            return res.json(newUser);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Find a user by UUID
exports.getuserByUUID = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const userData = await User.findOne({
            where: { id: uuid },
        });
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(userData);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a user
exports.updateuser = async (req, res) => {
    const id = req.params.uuid;
    const { name, email, password, phone, type, status } = req.body;
    try {
        const user = await User.findOne({
            where: { id },
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.name = name;
        user.email = email;
        user.password = password;
        user.phone = phone;
        user.type = type;
        user.status = status;

        await user.save();
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a user
exports.deleteuser = async (req, res) => {
    const id = req.params.uuid;
    try {
        const user = await User.findOne({
            where: { id },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.destroy();
        return res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
