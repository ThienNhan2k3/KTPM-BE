const express = require("express");
const voucherController = require("../controllers/voucherController");

const router = express.Router();

router.get(
  "/getVoucherByIdBrand/:id_brand",
  voucherController.getVoucherByIdBrand
);
// router.get("/getAll", voucherController.getAll);
// router.get("/getAll_active", voucherController.getAll_active);
// router.post("/create", accountController.createAccount);
// router.get("/get/:uuid", accountController.getAccountByUUID);
// router.put("/update/:uuid", accountController.updateAccount);
// router.delete("/delete/:uuid", accountController.deleteAccount);

module.exports = router;
