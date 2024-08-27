const { where } = require('sequelize');
const { Question, Quiz  } = require('../models');
const questions = require('../models/questions');


// Get all questions
exports.getAll = async (req, res) => {
    try {
        const questions = await Question.findAll();
        return res.json(questions);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Create a question
exports.create = async (req, res) => {
    const {id_quiz, ques, choice_1, choice_2, choice_3, choice_4, answear,} = req.body;
    try {
        const quiz = await Quiz .findOne({
            where: {
                id: id_quiz,
            }
        });

        if (quiz) {
            console.log(ques);
            const question = await Question.create({
                id_quiz: quiz.id, // Assuming the QuizEvent has an `id` field that relates to `id_quiz`
                ques,
                choice_1,
                choice_2,
                choice_3,
                choice_4,
                answear,
                time_update: new Date() // Set the current time for `time_update`
            });
            return res.json(question);
        } else {
            return res.status(403).json({ error: 'Quiz not found' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Find a question by Quiz
exports.getbyQuiz = async (req, res) => {
    console.log('get questions by quiz api called');
    const id_quiz = req.params.uuid;
    try {
        const questions = await Question.findAll({
            where: { id_quiz },
        });
        return res.json(questions);
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
