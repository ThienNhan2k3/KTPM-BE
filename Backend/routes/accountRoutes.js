const express = require("express");
const accountController = require("../controllers/accountController");
const { upload } = require("../middlewares/uploadFile");

const router = express.Router();

router.get("/getAll/:type", accountController.getAllAccounts);
router.post(
  "/create/user",
  upload.single("my_image"),
  accountController.createAccountUser
);
router.get("/getAccount/:type/:uuid", accountController.getAccountByUUID);
router.put("/update/status/:type/:uuid", accountController.updateStatusAccount);
router.put(
  "/update/information/user/:uuid",
  upload.single("my_image"),
  accountController.updateInformationUser
);
router.put(
  "/update/information/brand/:uuid",
  upload.single("my_image"),
  accountController.updateInformationBrand
);
router.put(
  "/update/password/:type/:uuid",
  accountController.updatePasswordAccount
);
router.delete("/delete/:type/:uuid", accountController.deleteAccount);

module.exports = router;
