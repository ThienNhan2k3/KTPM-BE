const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/getAll', userController.getAll);
router.post('/create', userController.createuser);
router.get('/get/:uuid', userController.getuserByUUID);
router.put('/update/:uuid', userController.updateuser);
router.delete('/delete/:uuid', userController.deleteuser);

router.get('/items/:id_user', userController.getBrandsAndEventsOfItemsByUser)
router.get('/items/:id_user/:id_event', userController.getItemsOfEventByUser)
router.get('/gift_items_history/:id_giver', userController.getGiftItemsHistoryByGiver)
router.post('/sendItems', userController.sendItems)

module.exports = router;