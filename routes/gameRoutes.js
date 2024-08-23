const express = require("express");
const router = express.Router();
const GameController = require("../controllers/gameController");

const upload = require("../middlewares/uploadFile.js");


router.get("/", GameController.getAllGames);
router.get("/:id", GameController.getGame);
router.post("/:id", upload.single('image'), GameController.updateImageById);


module.exports = router;