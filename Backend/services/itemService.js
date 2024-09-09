const {Item, User_Item, Event} = require("../models");
const { Op } = require('@sequelize/core');


class ItemService {
    static async getAllItemOfEvent(eventId) {
        return Item.findAll({
            where: {
                id_event: eventId
            }
        });
    }

    static async findById(id) {
        return Item.findOne({
            where: {
                id
            }
        });
    }

    static async getNumberOfItemInEvent(eventId) {
        return Item.count({
            where: {
                id_event: eventId
            },
        });
    }
    static async getNumberOfItemOfUserInEvent(userId, eventId) {
        return User_Item.count({
            where: {
                id_user: userId,
                quantity: {
                    [Op.gt]: 0,
                },   
            },
            include: [{
                model: Item,
                where: {
                    id_event: eventId
                }
                
            }]
        });
    }

    static async deleteItemOfUser(userId, itemId) {
        try {
            const item = await User_Item.findOne({
                where: {
                    id_user: userId,
                    id_item: itemId
                }
            })
            if (item.quantity > 1) {
                item.quantity -= 1;
                await item.save();
            } else {
                await item.destroy();
            }
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
        
    }
    static async giveRandomItemToUser(userId, eventId, quantity) {
        try {
            const items = await ItemService.getAllItemOfEvent(eventId);
            const randomItem = items[(Math.floor(Math.random() * items.length))];

            const [userItem, created] = await User_Item.findOrCreate({
                where: {  
                    id_item: randomItem.id, 
                    id_user: userId,
                },
                defaults: {
                    id_item: randomItem.id, 
                    id_user: userId,
                    quantity,
                    time_update: new Date()
                },  
            })
            if (!created) {
                userItem.quantity += quantity;
                await userItem.save();
            }
    
            return randomItem;    
        } catch (error) {
            console.error(error);
        }
        
    }

    static async getItemsByUserAndEvent(userId, eventId) {
        try {
            // Truy vấn tất cả các items theo eventId
            const items = await Item.findAll({
                attributes: ['name', 'id'], // Lấy trường 'name' và 'id từ bảng Item
                where: {
                    id_event: eventId, 
                },
            });

            // Truy vấn số lượng các items của người dùng
            const userItems = await User_Item.findAll({
                attributes: ['id_item', 'quantity'], 
                where: {
                    id_user: userId, 
                },
            });

            // Tạo một dictionary để lưu trữ quantity của từng item
            const userItemsMap = userItems.reduce((acc, userItem) => {
                acc[userItem.id_item] = userItem.quantity;
                return acc;
            }, {});

            return items.map(item => ({
                itemName: item.name,
                quantity: userItemsMap[item.id] || 0, // Lấy quantity từ dictionary, mặc định là 0 nếu không có
            }));
        } catch (error) {
            console.error('Error fetching items by user and event:', error);
            throw error; // Ném lỗi để xử lý bên trên
        }
    }
    
}

module.exports = ItemService;