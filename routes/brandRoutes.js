const express = require('express');
const brandController = require('../controllers/brandController');

const router = express.Router();

router.get('/getAll', brandController.getAll);
router.post('/create', brandController.create);
router.post('/activate/:uuid', brandController.activate);
router.get('/get/:uuid', brandController.getByUUID);
router.put('/update/:uuid', brandController.update);
router.delete('/delete/:uuid', brandController.delete);

module.exports = router;
