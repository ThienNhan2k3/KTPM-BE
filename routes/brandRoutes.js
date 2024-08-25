const express = require('express');
const brandController = require('../controllers/brandController');

const router = express.Router();

router.get('/getAll', brandController.getAll);
router.post('/create', brandController.create);
//router.get('/get/:uuid', brandController.getbrandByUUID);
//router.put('/update/:uuid', brandController.updatebrand);
//router.delete('/delete/:uuid', brandController.deletebrand);

module.exports = router;
