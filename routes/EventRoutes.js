const express = require('express');
const EventController = require('../controllers/EventController.js');

const router = express.Router();

router.get('/getAll', EventController.getAll);
router.post('/create', EventController.create);
//router.get('/get/:uuid', quizEventController.getByUUID);
router.put('/update/:uuid', EventController.update);
//router.delete('/delete/:uuid', quizEventController.delete);

module.exports = router;
