const express = require("express");
const voucher_in_eventController = require("../controllers/voucher_in_eventController");

const router = express.Router();

router.get("/getVoucherByIdEvent/:uuid", voucher_in_eventController.getVoucherByIdEvent);
//router.get("/getAll", voucherController.getAll);
//router.get("/getAll_active", voucherController.getAll_active);
// router.post("/create", accountController.createAccount);
// router.get("/get/:uuid", accountController.getAccountByUUID);
// router.put("/update/:uuid", accountController.updateAccount);
// router.delete("/delete/:uuid", accountController.deleteAccount);

module.exports = router;
