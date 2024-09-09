const { where } = require('sequelize');
const { Op } = require('sequelize');
const { Event, Fav_Event, User_Event } = require('../models');
const ItemService = require("../services/itemService");
const VoucherService = require('../services/voucherService');
const EventService = require('../services/eventService');
const ErrorResponse = require('../core/errorResponse');
const rabbitMQConnection = require("../database/rabbitmq/connection");


// Get all events
exports.getAll = async (req, res) => {
    try {
        const events = await Event.findAll({
            order: [['id', 'ASC']]
        });
        return res.json(events);
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


// Get all ongoing events
exports.getOngoingEvents = async (req, res) => {
    try {
        const currentDate = new Date(); // lấy thời gian hiện tại

        // Tìm các sự kiện có start_time đã qua và end_time chưa đến hiện tại
        const ongoingEvents = await Event.findAll({
            where: {
                start_time: { [Op.lte]: currentDate }, // start_time phải nhỏ hơn hoặc bằng hiện tại
                end_time: { [Op.gte]: currentDate }    // end_time phải lớn hơn hoặc bằng hiện tại
            }
        });

        return res.json(ongoingEvents);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
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

//Lac xi
exports.playLacXiEvent = async (req, res) => {
    const eventId = req.params.uuid;
    const userId = req.params.userId;
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

// Hàm lấy số lượt chơi từ bảng user_events, nếu không có thì thêm mới với 10 lượt chơi
exports.getOrCreatePlaythrough = async (req, res) => {
    const { userId, eventId } = req.params; // Lấy userId và eventId từ req.params

    try {
        // Kiểm tra xem bản ghi user_events có tồn tại hay không
        let userEvent = await User_Event.findOne({
            where: {
                id_user: userId,
                id_event: eventId,
            },
        });

        if (userEvent) {
            // Nếu tìm thấy, trả về số lượt chơi
            return res.status(200).json({
                playthrough: userEvent.playthrough,
            });
        } else {
            // Nếu không tìm thấy, thêm một bản ghi mới với 10 lượt chơi
            userEvent = await User_Event.create({
                id: require('uuid').v4(), // Tạo UUID cho bản ghi mới
                id_user: userId,
                id_event: eventId,
                playthrough: 10, // Thiết lập số lượt chơi ban đầu là 10
                time_update: new Date(), // Thời gian cập nhật là hiện tại
            });

            // Trả về kết quả sau khi thêm mới
            return res.status(201).json({
                playthrough: userEvent.playthrough,
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getUserItemsForEvent = async (req, res) => {
    const { userId, eventId } = req.params; 
    
    try {
        const items = await ItemService.getItemsByUserAndEvent(userId, eventId);
        return res.status(200).json({
            items: items 
        });
    } catch (err) {
        console.error('Error fetching user items for event:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.redeemGift = async (req, res) => {
    const userId = req.user.id;
    const eventId = req.params.uuid;
    try {
        const itemsInEvent = await ItemService.getAllItemOfEvent(eventId);
        const itemOfUsers =  await ItemService.getNumberOfItemOfUserInEvent(userId, eventId);
        
        if (itemOfUsers == itemsInEvent.length) {
            rabbitMQConnection.sendToTopicExchange("items", "deleteEachItemOfUserInEvent", {
                userId,
                items: itemsInEvent
            });    
            // for (let i = 0; i < itemsInEvent.length; i++) {
            //     await ItemService.deleteItemOfUser(userId, itemsInEvent[i].id);
            // }
            const vouchersInEvent = await VoucherService.findVouchersByEventId(eventId)
            const randomVoucher = vouchersInEvent[(Math.floor(Math.random() * vouchersInEvent.length))];
            // const isAsignedVoucher = await  VoucherService.setVoucherToUser(userId, randomVoucher. Voucher_In_Events[0].id, 1)
            rabbitMQConnection.sendToTopicExchange("vouchers", "setVoucherToUser", {
                userId,
                voucherInEventId: randomVoucher.Voucher_In_Events[0].id,
                quantity: 1
            }); 
            return res.json({
                code: 200,
                item: randomVoucher
            });
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

// Get all favorite ongoing events of the user and delete outdated ones
exports.getAllFavorite = async (req, res) => {
    const { userId } = req.query;

    try {
        //Lấy tất cả các sự kiện yêu thích của người dùng từ bảng fav_events
        const favorites = await Fav_Event.findAll({
            where: { id_user: userId },
            attributes: ['id_event', 'time_update'],
        });

        if (favorites.length === 0) {
            return res.status(404).json({ message: "No favorite events found." });
        }

        // Lấy danh sách id_event từ các sự kiện yêu thích
        const eventIds = favorites.map(fav => fav.id_event);

        //Lấy thông tin sự kiện từ bảng events dựa vào id_event
        const ongoingEvents = await Event.findAll({
            where: {
                id: {
                    [Op.in]: eventIds,
                },
                end_time: {
                    [Op.gte]: new Date(),
                },
            },
        });

        //Xác định các id_event không còn diễn ra
        const ongoingEventIds = ongoingEvents.map(event => event.id);
        const outdatedEventIds = eventIds.filter(id => !ongoingEventIds.includes(id));

        // Xóa các sự kiện không còn diễn ra khỏi bảng fav_events
        if (outdatedEventIds.length > 0) {
            await Fav_Event.destroy({
                where: {
                    id_user: userId,
                    id_event: {
                        [Op.in]: outdatedEventIds,
                    },
                },
            });
        }

        // Trả về các sự kiện đang diễn ra
        if (ongoingEvents.length > 0) {
            return res.status(200).json(ongoingEvents);
        } else {
            return res.status(404).json({ message: "No ongoing favorite events found." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


