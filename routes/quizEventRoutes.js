const express = require('express');
const quizEventController = require('../controllers/quizEventController.js');

const router = express.Router();

router.get('/getAll', quizEventController.getAll);
router.post('/create', quizEventController.create);
router.get('/get/:uuid', quizEventController.getByUUID);
router.put('/update/:uuid', quizEventController.update);
router.delete('/delete/:uuid', quizEventController.delete);

module.exports = router;
