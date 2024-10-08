const { User_Voucher, Voucher, Voucher_In_Event, Item } = require('../models');
const { Op } = require('sequelize');

exports.getAllByUserUuid = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        // Lấy tất cả các id_voucher và quantity từ bảng User_Voucher theo id_user
        const userVouchers = await User_Voucher.findAll({
            where: { 
                id_user: uuid, 
                quantity: {
                    [Op.gt]: 0
                }
            },
            attributes: ['id_voucher', 'quantity'], // Lấy cả id_voucher và quantity
        });

        // Trích xuất danh sách id_voucher và quantity
        const voucherIds = userVouchers.map(v => v.id_voucher);
        const voucherQuantities = userVouchers.reduce((acc, v) => {
            acc[v.id_voucher] = v.quantity;
            return acc;
        }, {});

        // So khớp id_voucher với bảng Voucher_In_Event để lấy voucher_code
        const voucherInEvents = await Voucher_In_Event.findAll({
            where: { id: voucherIds },
            attributes: ['id_voucher_code', 'id'], // Lấy voucher_code và id để liên kết
        });

        // Trích xuất danh sách voucher_code
        const voucherCodes = voucherInEvents.map(v => v.id_voucher_code);
        const voucherMap = voucherInEvents.reduce((acc, v) => {
            acc[v.id_voucher_code] = v.id;
            return acc;
        }, {});

        // So khớp voucher_code với bảng Voucher để lấy thông tin voucher tương ứng
        const vouchers = await Voucher.findAll({
            where: { voucher_code: voucherCodes, status: "Active" },
        });

        // Thêm quantity từ userVouchers vào kết quả trả về
        const vouchersWithQuantity = vouchers.map(v => ({
            ...v.toJSON(),
            quantity: voucherQuantities[voucherMap[v.voucher_code]] || 0,
        }));

        // Trả về danh sách voucher cùng với quantity
        return res.json(vouchersWithQuantity);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getAllUsedByUserUuid = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        // Lấy tất cả các id_voucher và used từ bảng User_Voucher theo id_user
        const userVouchers = await User_Voucher.findAll({
            where: { 
                id_user: uuid, 
                used: {
                    [Op.gt]: 0
                }
            },
            attributes: ['id_voucher', 'used'], // Lấy id_voucher và used (đổi thành quantity sau)
        });

        // Trích xuất danh sách id_voucher và used
        const voucherIds = userVouchers.map(v => v.id_voucher);
        const voucherUsed = userVouchers.reduce((acc, v) => {
            acc[v.id_voucher] = v.used; // Ánh xạ id_voucher với used
            return acc;
        }, {});

        // So khớp id_voucher với bảng Voucher_In_Event để lấy voucher_code
        const voucherInEvents = await Voucher_In_Event.findAll({
            where: { id: voucherIds },
            attributes: ['id_voucher_code', 'id'], // Lấy id và voucher_code
        });

        // Trích xuất danh sách voucher_code
        const voucherCodes = voucherInEvents.map(v => v.id_voucher_code);
        const voucherMap = voucherInEvents.reduce((acc, v) => {
            acc[v.id_voucher_code] = v.id;
            return acc;
        }, {});

        // So khớp voucher_code với bảng Voucher để lấy thông tin voucher tương ứng
        const vouchers = await Voucher.findAll({
            where: { voucher_code: voucherCodes, status: "Active" },
        });

        // Thêm used từ userVouchers (đổi tên thành quantity) vào kết quả trả về
        const vouchersWithQuantity = vouchers.map(v => ({
            ...v.toJSON(),
            quantity: voucherUsed[voucherMap[v.voucher_code]] || 0, // Đặt used là quantity
        }));

        // Trả về danh sách voucher cùng với quantity
        return res.json(vouchersWithQuantity);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getAll = async (req, res) => {
    try {
        const vouchers = await User_Voucher.findAll();
        return res.json(vouchers);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.addVoucherIntoWarehouse = async (req, res) => {
    const { id_voucher, id_user } = req.body; 
    try {
        // Tìm kiếm voucher đã tồn tại cho người dùng
        const existedVoucher = await User_Voucher.findOne({
            where: { id_voucher, id_user },
        });

        if (existedVoucher) {
            // Nếu voucher đã tồn tại, tăng số lượng và lưu lại
            existedVoucher.quantity += 1;
            await existedVoucher.save();
            return res.json(existedVoucher);
        } else {
            // Nếu voucher chưa tồn tại, tạo mới
            const newVoucher = await User_Voucher.create({
                id_voucher,
                id_user,
                quantity: 1,
                time_update: new Date() // Thêm thời gian cập nhật hiện tại
            });
            return res.json(newVoucher);
        }
    } catch (err) {
        console.error('Error adding voucher:', err);
        return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
};

exports.getItemById = async (req, res) => {
    const { id } = req.params; // Lấy id_item từ tham số URL
    try {
        if (!id) {
            return res.status(400).json({ error: 'ID parameter is required' });
        }

        // Tìm bản ghi theo id_item
        const giftItem = await Item.findOne({
            where: { id },
        });

        if (!giftItem) {
            // Nếu không tìm thấy, trả về mã lỗi 404
            return res.status(404).json({ message: 'Item not found' });
        }

        // Trả về kết quả dưới dạng JSON
        res.json(giftItem);
    } catch (error) {
        console.error('Error fetching item:', error); // In chi tiết lỗi
        // Trả về mã lỗi 500 nếu có lỗi server
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};