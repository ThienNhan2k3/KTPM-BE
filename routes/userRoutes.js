const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/getAll', userController.getAll);
router.post('/create', userController.createuser);
router.get('/get/:uuid', userController.getuserByUUID);
router.put('/update/:uuid', userController.updateuser);
router.delete('/delete/:uuid', userController.deleteuser);

module.exports = router;