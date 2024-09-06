const express = require('express');
const EventController = require('../controllers/EventController.js');
const upload = require("../middlewares/uploadFile.js");

const router = express.Router();

router.get('/getAll', EventController.getAll);
router.post('/create', EventController.create);
//router.get('/get/:uuid', quizEventController.getByUUID);
router.put('/update/:uuid', EventController.update);
//router.delete('/delete/:uuid', quizEventController.delete);
router.get('/getEvent/:id', EventController.getByID);

//favEvent
router.get('/getAllFavEvent', EventController.getAllFavorite);
router.get('/checkFavEvent', EventController.checkFavorite);
router.post('/addFavEvent', EventController.addFavorite)
router.delete('/deleteFavEvent', EventController.deleteFavorite)

router.get("/lacxi/:uuid", EventController.playLacXiEvent); 
router.get("/lacxi/:uuid/redeem", EventController.redeemGift); 
router.get("/share/:uuid", EventController.shareFb); 
// router.post("/donate/:uuid", EventController.donateTicket); 

module.exports = router;
