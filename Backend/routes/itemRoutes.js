const express = require('express');
const itemController = require('../controllers/itemController');
const { upload } = require("../middlewares/uploadFile");

const router = express.Router();

router.get('/getAll', itemController.getAll);
router.post('/create', 
    upload.single("my_image"),
    itemController.create);
router.get('/getByIdEvent/:uuid', itemController.getbyIdEvent);
router.put('/update/:uuid', itemController.update);
router.delete('/delete/:uuid', itemController.delete);

module.exports = router;