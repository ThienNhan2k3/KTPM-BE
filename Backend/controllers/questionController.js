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
    const {id_quiz, ques, choice_1, choice_2, choice_3, choice_4, answer} = req.body;
    try {
        const quiz = await Quiz .findOne({
            where: {
                id: id_quiz,
            }
        });

        if (quiz) {
            //console.log(answer.type);
            //console.log(answer);
            const question = await Question.create({
                id_quiz: quiz.id, // Assuming the QuizEvent has an `id` field that relates to `id_quiz`
                ques,
                choice_1,
                choice_2,
                choice_3,
                choice_4,
                answer,
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
        //console.log(questions);
        
        return res.json(questions);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Update an quiz
exports.update = async (req, res) => {
    const id = req.params.uuid;
    const { id_quiz, ques, choice_1, choice_2, choice_3, choice_4, answer} = req.body;
    console.log(req.body);
    console.log("Update question");
    try {
        const question = await Question.findOne({
            where: { id },
        });
        if (!question) {
            return res.status(404).json({ error: 'question not found' });
        }
        question.ques = ques;
        question.choice_1 = choice_1;
        question.choice_2 = choice_2;
        question.choice_3 = choice_3;
        question.choice_4 = choice_4;
        question.answer = answer;

        await question.save();
        return res.json(question);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Delete an quiz
exports.delete = async (req, res) => {
    const id = req.params.uuid;
    try {
        const question = await Question.findOne({
            where: { id },
        });

        if (!question) {
            return res.status(404).json({ error: 'question not found' });
        }

        await question.destroy();
        return res.json({ message: 'Question deleted successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
