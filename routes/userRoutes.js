const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/getAll', userController.getAll);
//router.post('/create', userController.create);
//router.get('/get/:uuid', userController.getByUUID);
//router.put('/update/:uuid', userController.update);
//router.delete('/delete/:uuid', userController.delete);

module.exports = router;
