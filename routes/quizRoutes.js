const express = require('express');
const quizController = require('../controllers/quizController.js');

const router = express.Router();

router.get('/getAll', quizController.getAllQuizs);
router.post('/create', quizController.createQuiz);
router.get('/get/:uuid', quizController.getQuizByUUID);
router.put('/update/:uuid', quizController.updateQuiz);
router.delete('/delete/:uuid', quizController.deleteQuiz);

module.exports = router;
