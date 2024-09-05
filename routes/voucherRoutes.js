const express = require("express");
const voucherController = require("../controllers/voucherController");

const router = express.Router();

router.get(
  "/getVoucherByIdBrand/:id_brand",
  voucherController.getVoucherByIdBrand
);
router.post("/create", voucherController.createVoucher);
router.put("/update/:voucher_code", voucherController.updateVoucher);
router.delete("/delete/:voucher_code", voucherController.deleteVoucher);

// router.get("/getAll", voucherController.getAll);
// router.get("/getAll_active", voucherController.getAll_active);

router.get("/getAll", voucherController.getAll);
router.get("/getAll_active", voucherController.getAll_active);
// router.post("/create", accountController.createAccount);
// router.get("/get/:uuid", accountController.getAccountByUUID);

module.exports = router;
