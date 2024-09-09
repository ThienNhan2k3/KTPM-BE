const { where } = require('sequelize');
const { Quiz, Question} = require('../models');


// Get all quizs
exports.getAll = async (req, res) => {
    console.log('get all api quiz called');
    try {
        const quizes = await Quiz.findAll();
        return res.json(quizes);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Create a quiz
exports.create = async (req, res) => {
    const { id_event, id_game } = req.body;
    try {
        const quiz = await Quiz.create(
            { 
                id_event, 
                id_game,
                time_update: new Date()
            });
        return res.json(quiz);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Find a quiz by ID
exports.getQuiz = async (req, res) => {
    const id = req.params.uuid;
    try {
        const quiz = await Quiz.findOne({
            where: { id },
        });
        return res.json(quiz);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

//Find a quiz by id_event
exports.getQuiz_byEvent = async (req, res) => {
    const id_event = req.params.uuid;
    try {
        const quiz = await Quiz.findOne({
            where: { id_event },
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
    const { question, answers, correct_answer, qeID} = req.body;
    try {
        const quizevent = await QuizEvent.findOne({
            where: {
                uuid: qeID,
            }
        })
        if(quizevent) {
            const quiz = await Quiz.findOne({
                where: { uuid },
            });
            if (!quiz) {
                return res.status(404).json({ error: 'quiz not found' });
            }
            quiz.question = question;
            quiz.answers = answers;
            quiz.correct_answer = correct_answer;
            quiz.qeID = qeID;
    
            await quiz.save();
            return res.json(quiz);
        } else return res.status(404).json({ error: 'qeID not found' });
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

// Hàm trả về số lượng câu hỏi dựa trên id_event
exports.getQuestionCountByEvent = async (req, res) => {
    const { id_event } = req.params;
    try {
        // Tìm quiz dựa trên id_event
        const quiz = await Quiz.findOne({
            where: { id_event },
        });

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found for the given event ID' });
        }

        // Tìm số lượng câu hỏi dựa trên id_quiz của quiz tìm được
        const questionCount = await Question.count({
            where: { id_quiz: quiz.id },
        });

        // Trả số lượng câu hỏi về client
        return res.json({ questionCount });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
