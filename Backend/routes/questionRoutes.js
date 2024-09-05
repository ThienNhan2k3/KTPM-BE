const express = require('express');
const questionController = require('../controllers/questionController.js');

const router = express.Router();

router.get('/getAll', questionController.getAll);
router.post('/create', questionController.create);
router.get('/get_byQuiz/:uuid', questionController.getbyQuiz);
//router.get('/get/:uuid', questionController.getquestionByUUID);
//router.put('/update/:uuid', questionController.updatequestion);
//router.delete('/delete/:uuid', questionController.deletequestion);

module.exports = router;
