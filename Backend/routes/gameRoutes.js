const express = require("express");
const router = express.Router();
const GameController = require("../controllers/gameController");

const { upload } = require("../middlewares/uploadFile");

router.get("/", GameController.getAllGames);
router.get("/:id", GameController.getGame);
router.post(
  "/:id/image",
  upload.single("image"),
  GameController.updateImageById
);
router.post("/:id", upload.single("image"), GameController.updateById);

module.exports = router;
