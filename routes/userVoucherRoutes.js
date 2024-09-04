const express = require('express');
const userVoucherController = require('../controllers/userVoucherController');

const router = express.Router();

router.get('/getAll', userVoucherController.getAll);
router.get('/get/:uuid', userVoucherController.getAllByUserUuid)
router.post('/addVoucher', userVoucherController.addVoucherIntoWarehouse)

module.exports = router;