const { where } = require('sequelize');
const { Event } = require('../models');
const ItemService = require("../services/itemService");
const VoucherService = require('../services/voucherService');
const EventService = require('../services/eventService');
const ErrorResponse = require('../core/errorResponse');


// Get all events
exports.getAll = async (req, res) => {
    try {
        const events = await Event.findAll();
        return res.json(events);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

//Create an event
exports.create = async (req, res) => {
    const { type, id_game, id_brand, name, image, start_time, end_time } = req.body;
    try {
        /*const brand = await event.findOne({
            where: {
                uuid: brand_id,
            }
        })
        if(brand) {
            const event = await Event.create({ name, brand_id, started_date, end_date  });
            return res.json(event);
        } else return res.status(404).json({ error: 'Brand not found!' });*/
        const new_event = await Event.create({
            type, id_game, id_brand, name, image, start_time, end_time,
            time_update: new Date(),
        });
        return res.json(new_event);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Find an event by UUID
exports.getByUUID = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const event = await Event.findOne({
            where: { uuid },
        });

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        return res.json(event);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Update an event
exports.update = async (req, res) => {
    const id = req.params.uuid;
    const { type, id_game, id_brand, name, image, start_time, end_time } = req.body;
    try {
        const update_event = await Event.findOne({
            where: { id },
        });
        if (!update_event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        update_event.name = name;
        update_event.image = image;
        update_event.start_time = start_time;
        update_event.end_time = end_time;
        update_event.time_update= new Date();

        await update_event.save();
        return res.json(update_event);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Delete an event
exports.deleteAccount = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const event = await Event.findOne({
            where: { uuid },
        });

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        await event.destroy();
        return res.json({ message: 'Event deleted successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.playLacXiEvent = async (req, res) => {
    const eventId = req.params.uuid;
    const userId = req.user.id;
    try {
        if (await EventService.removeEventTicket(eventId, userId)) {
            return res.json({
                code: 200,
                item: await  ItemService.giveRandomItemToUser(userId, eventId, 1)
            });
        }
        return res.json({
            code: 400,
            message: "Bạn không có đủ vé để tham gia"
        });
       
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

exports.redeemGift = async (req, res) => {
    const userId = req.user.id;
    const eventId = req.params.uuid;
    try {
        const itemsInEvent = await ItemService.getAllItemOfEvent(eventId);
        const itemOfUsers =  await ItemService.getNumberOfItemOfUserInEvent(userId, eventId);
        
        if (itemOfUsers == itemsInEvent.length) {
            for (let i = 0; i < itemsInEvent.length; i++) {
                console.log(itemsInEvent[i].id);
                await ItemService.deleteItemOfUser(userId, itemsInEvent[i].id);
            }
            const vouchersInEvent = await VoucherService.findVouchersByEventId(eventId)
            const randomVoucher = vouchersInEvent[(Math.floor(Math.random() * vouchersInEvent.length))];
            const isAsignedVoucher = await  VoucherService.setVoucherToUser(userId, randomVoucher. Voucher_In_Events[0].id, 1)
            if (isAsignedVoucher) {
                return res.json({
                    code: 200,
                    item: randomVoucher
                });
            }
            throw new ErrorResponse("Server Internal Error", 500);
        }

        return res.json({
            code: 400,
            message: "Bạn không có đủ items"
        });

        
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}
exports.shareFb = async (req, res) => {
    const userId = req.user.id;
    const eventId = req.params.uuid;
    try {
        const isAdded = await EventService.addEventTicket(eventId, userId);
        if (isAdded) {
            return res.json({
                code: 200,
                message: "Thêm ticket thành công"
            });
        }
        throw new ErrorResponse("Server Internal Error", 500);


        
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}
exports.donateTicket = async (req, res) => {
    return res.json({
        message: "Chưa làm"
    })
}
