const express = require("express");
const accountController = require("../controllers/accountController");

const router = express.Router();

router.get("/getAll/:type", accountController.getAllAccounts);
router.post("/create/user", accountController.createAccountUser);
router.get("/get/:uuid", accountController.getAccountByUUID);
router.put("/update/:type/:uuid", accountController.updateAccount);
router.delete("/delete/:type/:uuid", accountController.deleteAccount);

module.exports = router;
