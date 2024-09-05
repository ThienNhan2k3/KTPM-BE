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
        console.log(await User_Item.findOne({
            where: {
                id_item: "c4fb5c4d-4ef7-4c43-b978-4bfab379dce3",  
            },
            // i
        }))
        return User_Item.count({
            where: {
                id_user: userId,
                quantity: {
                    [Op.gt]: 0,
                },   
            },
            include: [{
                model: Item,
                include: [{
                    model: Event,
                    where: {
                        id: eventId
                    }
                }]
                
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

  
}

module.exports = ItemService;