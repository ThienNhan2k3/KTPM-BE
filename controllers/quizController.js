const { Quiz } = require('../models');

// Get all quizs
exports.getAllQuizs = async (req, res) => {
    try {
        const quizs = await Quiz.findAll();
        return res.json(quizs);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Create an quiz
exports.createQuiz = async (req, res) => {
    const { question, answers, correct_answer } = req.body;
    try {
        const quiz = await Quiz.create({ question, answers, correct_answer });
        return res.json(quiz);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Find an quiz by UUID
exports.getQuizByUUID = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const quiz = await Quiz.findOne({
            where: { uuid },
        });
        return res.json(quiz);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Update an quiz
exports.updateQuiz = async (req, res) => {
    const uuid = req.params.uuid;
    const { question, answers, correct_answer } = req.body;
    try {
        const quiz = await Quiz.findOne({
            where: { uuid },
        });
        if (!quiz) {
            return res.status(404).json({ error: 'quiz not found' });
        }
        quiz.question = question;
        quiz.answers = answers;
        quiz.correct_answer = correct_answer;

        await quiz.save();
        return res.json(quiz);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Delete an quiz
exports.deleteQuiz = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const quiz = await Quiz.findOne({
            where: { uuid },
        });

        if (!quiz) {
            return res.status(404).json({ error: 'quiz not found' });
        }

        await quiz.destroy();
        return res.json({ message: 'quiz deleted successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
