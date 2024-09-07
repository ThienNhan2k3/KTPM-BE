const { User, User_Item, Item, Event, Gift_Items_History } = require('../models');
const { Op } = require('sequelize');

// Get all users
exports.getAll = async (req, res) => {
    try {
        const users = await User.findAll({
            where: {
                type: "Người chơi"
            }
        });
        return res.json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create a user
exports.createuser = async (req, res) => {
    const { full_name, email, password, phone, type, status, user_name, avatar } = req.body;
    try {
        const existingUser = await User.findOne({
            where: { phone },
        });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists!' });
        } else {
            const newUser = await User.create({ full_name, email, password, phone, type, status, user_name, avatar, time_update: new Date() });
            return res.json(newUser);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Find a user by UUID
exports.getuserByUUID = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const userData = await User.findOne({
            where: { id: uuid },
        });
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(userData);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a user
exports.updateuser = async (req, res) => {
    const id = req.params.uuid;
    const { name, email, password, phone, type, status } = req.body;
    try {
        const user = await User.findOne({
            where: { id },
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.name = name;
        user.email = email;
        user.password = password;
        user.phone = phone;
        user.type = type;
        user.status = status;

        await user.save();
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a user
exports.deleteuser = async (req, res) => {
    const id = req.params.uuid;
    try {
        const user = await User.findOne({
            where: { id },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.destroy();
        return res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getItemsOfEventByUser = async (req, res) => {
    const { id_user, id_event } = req.params; // Nhận id_user và id_event từ request params

    try {
        // Truy vấn từ bảng User_Item dựa trên id_user và tham gia với bảng Item theo id_item và id_event
        const userItems = await User_Item.findAll({
            where: { 
                id_user: id_user
            },
            include: [
                {
                    model: Item, // Kết hợp với bảng Item
                    where: {
                        id_event: id_event // Lọc theo id_event
                    },
                    attributes: ['id', 'id_event', 'name', 'image'], // Lấy các cột cần thiết từ bảng Item
                }
            ],
            attributes: ['id_item', 'quantity', 'time_update'], // Lấy các cột cần thiết từ bảng User_Item
        });

        // Nếu không tìm thấy item nào
        if (userItems.length === 0) {
            return res.status(404).json({ message: 'No items found for this user in the specified event' });
        }

        // Trả về danh sách items với thông tin đã yêu cầu
        return res.json(userItems.map(userItem => ({
            id_item: userItem.id_item,
            id_event: userItem.Item.id_event,
            name: userItem.Item.name,
            image: userItem.Item.image,
            quantity: userItem.quantity,
            time_update: userItem.time_update
        })));
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getBrandsAndEventsOfItemsByUser = async (req, res) => {
    const { id_user } = req.params;

    // Kiểm tra xem id_user có giá trị không
    if (!id_user) {
        return res.status(400).json({ error: 'Missing id_user' });
    }

    try {
        // Tìm tất cả các item mà người dùng sở hữu
        const userItems = await User_Item.findAll({
            where: { id_user: id_user },
            include: [
                {
                    model: Item,
                    attributes: ['id', 'id_event'], // Lấy id_item và id_event từ Item
                    include: [
                        {
                            model: Event,
                            attributes: ['id', 'id_brand'] // Lấy id_event và id_brand từ Event
                        }
                    ]
                }
            ]
        });

        // Lấy danh sách cặp <id_brand, id_event>
        const brandEventPairs = userItems.map(userItem => {
            const item = userItem.Item;
            const event = item.Event;
            return {
                id_brand: event.id_brand,
                id_event: event.id
            };
        });

        // Loại bỏ các cặp trùng lặp
        const uniqueBrandEventPairs = brandEventPairs.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.id_brand === value.id_brand && t.id_event === value.id_event
            ))
        );

        // Trả về kết quả
        return res.json(uniqueBrandEventPairs);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getGiftItemsHistoryByGiver = async (req, res) => {
    const { id_giver } = req.params;
  
    try {
        // Kiểm tra id_giver có hợp lệ không
        if (!id_giver) {
            return res.status(400).json({ error: "id_giver is required" });
        }
        
        // Truy vấn tất cả các bản ghi có id_giver phù hợp
        const giftHistory = await Gift_Items_History.findAll({
            where: {
            id_giver: id_giver,
            },
            attributes: ['id_recipient', 'gift_time', 'id_item', 'quantity'], // Chỉ lấy những cột cần thiết
            order: [['gift_time', 'ASC']] // Sắp xếp theo thời gian
        });
        
        if (giftHistory.length > 0) {
            // Truy vấn tất cả các item để lấy tên
            const itemIds = giftHistory.map(item => item.id_item);
            const items = await Item.findAll({
            where: {
                id: itemIds,
            },
            attributes: ['id', 'name'],
            });
            
            // Tạo một map để tra cứu tên item từ id
            const itemMap = items.reduce((map, item) => {
            map[item.id] = item.name;
            return map;
            }, {});
    
            // Nhóm các bản ghi theo id_recipient và gift_time
            const result = giftHistory.reduce((acc, current) => {
            const existingGroup = acc.find(
                (group) => group.id_recipient === current.id_recipient && group.gift_time === current.gift_time.toISOString()
            );
    
            if (existingGroup) {
                // Nếu nhóm đã tồn tại, thêm id_item vào danh sách
                existingGroup.id_item.push({
                id: current.id_item,
                quantity: current.quantity,
                name: itemMap[current.id_item] || 'Unknown' // Thêm tên item vào
                });
            } else {
                // Nếu nhóm chưa tồn tại, tạo nhóm mới
                acc.push({
                id_recipient: current.id_recipient,
                gift_time: current.gift_time.toISOString(),
                id_item: [{
                    id: current.id_item,
                    quantity: current.quantity,
                    name: itemMap[current.id_item] || 'Unknown' // Thêm tên item vào
                }]
                });
            }
    
            return acc;
            }, []);
    
            // Trả về kết quả
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "No gift items found for this giver" });
        }
    } catch (error) {
    console.error("Error fetching gift items history: ", error);
    res.status(500).json({ error: "An error occurred while fetching gift items history" });
    }
};