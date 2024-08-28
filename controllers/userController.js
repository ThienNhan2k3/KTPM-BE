const { User } = require('../models');

// Get all users
exports.getAll = async (req, res) => {
    try {
        const users = await User.findAll({
            where:{
                type: "Người chơi"
            }
        });
        return res.json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Create an user
exports.createuser = async (req, res) => {
    const { name, email, password, phone, type, status } = req.body;
    try {
        const f_user = await user.findOne({
            where: { email },
        });
        if (f_user) {
            return res.status(404).json({ error: 'user already exist!' });
        } else {
            const user = await user.create({ name, email, password, phone, type, status });
            return res.json(user);
        }
        
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Find an user by UUID
exports.getuserByUUID = async (req, res) => {
    const id = req.params.uuid;
    try {
        const user = await user.findOne({
            where: { id },
        });
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Update an user
exports.updateuser = async (req, res) => {
    const id = req.params.uuid;
    const { name, email, password, phone, type, status } = req.body;
    try {
        const user = await user.findOne({
            where: { id },
        });
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
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
        return res.status(500).json(err);
    }
};

// Delete an user
exports.deleteuser = async (req, res) => {
    const id = req.params.uuid;
    try {
        const user = await user.findOne({
            where: { id },
        });

        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }

        await user.destroy();
        return res.json({ message: 'user deleted successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
