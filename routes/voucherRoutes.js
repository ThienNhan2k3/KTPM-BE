const express = require('express');
const voucherController = require('../controllers/voucherController');

const router = express.Router();

router.get('/getAll', voucherController.getAll);
router.get('/getAll_active', voucherController.getAll_active);
//router.post('/create', voucherController.create);
//router.post('/activate/:uuid', voucherController.activate);
//router.get('/get/:uuid', voucherController.getByUUID);
//router.put('/update/:uuid', voucherController.update);
//router.delete('/delete/:uuid', voucherController.delete);

module.exports = router;
