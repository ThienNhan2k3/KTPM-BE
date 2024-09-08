const express = require('express');
const itemController = require('../controllers/itemController');

const router = express.Router();

router.get('/getAll', itemController.getAll);
router.post('/create', itemController.create);
router.get('/getByIdEvent/:uuid', itemController.getbyIdEvent);
router.put('/update/:uuid', itemController.update);
router.delete('/delete/:uuid', itemController.delete);

module.exports = router;