const express = require('express');
const accountController = require('../controllers/accountController');

const router = express.Router();

router.get('/getAll', accountController.getAllAccounts);
router.post('/create', accountController.createAccount);
router.get('/get/:uuid', accountController.getAccountByUUID);
router.put('/update/:uuid', accountController.updateAccount);
router.delete('/delete/:uuid', accountController.deleteAccount);

module.exports = router;
