const express = require('express');
const questionController = require('../controllers/questionController.js');

const router = express.Router();

router.get('/getAll', questionController.getAll);
router.post('/create', questionController.create);
router.get('/get_byQuiz/:uuid', questionController.getbyQuiz);
router.put('/update/:uuid', questionController.update);
router.delete('/delete/:uuid', questionController.delete);

module.exports = router;
