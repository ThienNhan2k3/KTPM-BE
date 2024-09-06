const express = require('express');
const itemController = require('../controllers/itemController');

const router = express.Router();

//router.get('/getAll', itemController.getAll);
router.post('/create', itemController.create);
//router.get('/get/:uuid', itemController.getitemByUUID);
//router.put('/update/:uuid', itemController.updateitem);
//router.delete('/delete/:uuid', itemController.deleteitem);

module.exports = router;