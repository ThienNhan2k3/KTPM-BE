const express = require('express');
const EventController = require('../controllers/EventController.js');
const upload = require("../middlewares/uploadFile.js");

const router = express.Router();

router.get('/getAll', EventController.getAll);
router.get('/getOngoingEvents', EventController.getOngoingEvents);
router.post('/create', EventController.create);
//router.get('/get/:uuid', quizEventController.getByUUID);
router.put('/update/:uuid', EventController.update);
//router.delete('/delete/:uuid', quizEventController.delete);
router.get('/getEvent/:id', EventController.getByID);

//favEvent
router.get('/getAllFavEvent', EventController.getAllFavorite);
router.post('/addFavEvent', EventController.addFavorite)
router.delete('/deleteFavEvent', EventController.deleteFavorite)

//Lac xi
router.get("/lacxi/:uuid/:userId", EventController.playLacXiEvent); 
router.get("/lacxi/:uuid/redeem", EventController.redeemGift); 
router.get("/share/:uuid", EventController.shareFb); 
// router.post("/donate/:uuid", EventController.donateTicket); 
router.get('/lacxi/getOrCreatePlaythrough/:userId/:eventId', EventController.getOrCreatePlaythrough)
router.get('/lacxi/getUserItemsForEvent/:userId/:eventId', EventController.getUserItemsForEvent)

module.exports = router;
