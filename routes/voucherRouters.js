const express = require("express");
const voucherController = require("../controllers/voucherController");

const router = express.Router();

router.get(
  "/getVoucherByIdBrand/:id_brand",
  voucherController.getVoucherByIdBrand
);
// router.post("/create", accountController.createAccount);
// router.get("/get/:uuid", accountController.getAccountByUUID);
// router.put("/update/:uuid", accountController.updateAccount);
// router.delete("/delete/:uuid", accountController.deleteAccount);

module.exports = router;
