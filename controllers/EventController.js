const { where } = require('sequelize');
const { Event, Fav_Event } = require('../models');
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
    } catch(err) {
        console.error(err);
        throw new ErrorResponse(err.message, 500);
    }
}
        
//Check if event is in favorites list
exports.checkFavorite = async (req, res) => {
    const { eventId } = req.query; // Event ID từ params
    const { userId } = req.query; // User ID từ query string (hoặc có thể từ token/session tùy vào cách bạn quản lý xác thực)

    try {
        // Kiểm tra xem sự kiện có được yêu thích bởi người dùng không
        const favorite = await Fav_Event.findOne({
            where: {
                id_event: eventId,
                id_user: userId,
            },
        });

        if (favorite) {
            return res.json({ isFavorite: true });
        } else {
            return res.json({ isFavorite: false });
        }
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

// Add event to favorites
exports.addFavorite = async (req, res) => {
    const { id_event } = req.body; // Event ID từ body
    const { id_user } = req.body; // User ID từ body

    try {
        // Kiểm tra xem sự kiện đã có trong danh sách yêu thích của người dùng chưa
        const existingFavorite = await Fav_Event.findOne({
            where: {
                id_event: id_event,
                id_user: id_user,
            },
        });

        if (existingFavorite) {
            // Nếu đã tồn tại, trả về thông báo rằng sự kiện đã có trong danh sách yêu thích
            return res.status(400).json({ message: "Event is already in favorites." });
        }

        // Thêm sự kiện vào danh sách yêu thích
        const newFavorite = await Fav_Event.create({
            id_event: id_event,
            id_user: id_user,
            time_update: new Date(), // Thời gian cập nhật
        });

        return res.status(201).json({ message: "Event added to favorites successfully.", favorite: newFavorite });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Add event to favorites
exports.addFavorite = async (req, res) => {
    const { id_event } = req.body; // Event ID từ body
    const { id_user } = req.body; // User ID từ body

    try {
        // Kiểm tra xem sự kiện đã có trong danh sách yêu thích của người dùng chưa
        const existingFavorite = await Fav_Event.findOne({
            where: {
                id_event: id_event,
                id_user: id_user,
            },
        });

        if (existingFavorite) {
            // Nếu đã tồn tại, trả về thông báo rằng sự kiện đã có trong danh sách yêu thích
            return res.status(400).json({ message: "Event is already in favorites." });
        }

        // Thêm sự kiện vào danh sách yêu thích
        const newFavorite = await Fav_Event.create({
            id_event: id_event,
            id_user: id_user,
            time_update: new Date(), // Thời gian cập nhật
        });

        return res.status(201).json({ message: "Event added to favorites successfully.", favorite: newFavorite });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Xóa sự kiện khỏi danh sách yêu thích
exports.deleteFavorite = async (req, res) => {
    const { eventId } = req.query; // Event ID từ query string
    const { userId } = req.query; // User ID từ query string

    try {
        // Xóa sự kiện khỏi danh sách yêu thích
        const deleted = await Fav_Event.destroy({
            where: {
                id_event: eventId,
                id_user: userId,
            },
        });

        if (deleted) {
            return res.status(200).json({ message: "Favorite event deleted successfully." });
        } else {
            return res.status(404).json({ message: "Favorite event not found." });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// Get all favorite events of the user
exports.getAllFavorite = async (req, res) => {
    const { userId } = req.query; // Get userId from query string

    try {
        // Find all favorite events for the user
        const favorites = await Fav_Event.findAll({
            where: {
                id_user: userId,
            },
            attributes: ['id_event', 'time_update'], // Only select the required columns
        });

        // Check if any favorite events are found
        if (favorites.length > 0) {
            return res.status(200).json(favorites);
        } else {
            return res.status(404).json({ message: "No favorite events found." });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

//get event
exports.getByID = async (req, res) => {
    const id = req.params.id; 
    try {
      const event = await Event.findOne({
        where: { id }, // Sử dụng cột `id` thay vì `uuid`
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
