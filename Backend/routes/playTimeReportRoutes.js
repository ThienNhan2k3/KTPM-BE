
const express = require("express");
const router = express.Router();
const PlayTimeReportController = require("../controllers/playTimeReportController");


router.post("/playtimeingame", PlayTimeReportController.getPlayTimeInAllGame);

module.exports = router;
