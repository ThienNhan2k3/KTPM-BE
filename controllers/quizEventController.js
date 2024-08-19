const { QuizEvent, Quiz } = require('../models');

// Get all QuizEvents with associated Quizzes
exports.getAll = async (req, res) => {
    try {
        const quizEvents = await QuizEvent.findAll({});
        return res.json(quizEvents);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Create a QuizEvent with associated Quizzes
exports.create = async (req, res) => {
    const { name } = req.body;
    console.log(name);
    try {
        // Create the QuizEvent first
        const quizEvent = await QuizEvent.create({name});
        return res.json(quizEvent);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Find a QuizEvent by UUID with associated Quizzes
exports.getByUUID = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const quizEvent = await QuizEvent.findOne({
            where: { uuid },
            include: 'quizzes'
        });
        if (!quizEvent) {
            return res.status(404).json({ error: 'QuizEvent not found' });
        }
        return res.json(quizEvent);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Update a QuizEvent with associated Quizzes
exports.update = async (req, res) => {
    const uuid = req.params.uuid;
    const { name } = req.body;

    try {
        const quizEvent = await QuizEvent.findOne({
            where: { uuid },
        });
        if (!quizEvent) {
            return res.status(404).json({ error: 'QuizEvent not found' });
        }
        quizEvent.name = name;
        await quizEvent.save();
        return res.json(quizEvent);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Delete a QuizEvent with all associated Quizzes
exports.delete = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const quizEvent = await QuizEvent.findOne({
            where: { uuid },
        });

        if (!quizEvent) {
            return res.status(404).json({ error: 'QuizEvent not found' });
        }

        await Quiz.destroy({ where: { qeId: quizEvent.uuid } });
        await quizEvent.destroy();

        return res.json({ message: 'QuizEvent and all associated quizzes deleted successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
