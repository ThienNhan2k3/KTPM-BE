const express = require('express');
const quizController = require('../controllers/quizController.js');

const router = express.Router();

router.get('/getAll', quizController.getAll);
router.post('/create', quizController.create);
router.get('/get/:uuid', quizController.getQuiz);
router.get('/get_by_event/:uuid', quizController.getQuiz_byEvent);
//router.put('/update/:uuid', quizController.updateQuiz);
//router.delete('/delete/:uuid', quizController.deleteQuiz);

module.exports = router;
