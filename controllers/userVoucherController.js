const { User_Voucher, Voucher, Voucher_In_Event } = require('../models');


exports.getAllByUserUuid = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        // Lấy tất cả các id_voucher từ bảng User_Voucher theo id_user
        const userVouchers = await User_Voucher.findAll({
            where: { id_user: uuid },
            attributes: ['id_voucher'], // Chỉ lấy id_voucher
        });

        // Trích xuất danh sách id_voucher
        const voucherIds = userVouchers.map(v => v.id_voucher);

        // So khớp id_voucher với bảng Voucher_In_Event để lấy voucher_code
        const voucherInEvents = await Voucher_In_Event.findAll({
            where: { id: voucherIds },
            attributes: ['id_voucher_code'], // Chỉ lấy voucher_code
        });

        // Trích xuất danh sách voucher_code
        const voucherCodes = voucherInEvents.map(v => v.id_voucher_code);

        // So khớp voucher_code với bảng Voucher để lấy thông tin voucher tương ứng
        const vouchers = await Voucher.findAll({
            where: { voucher_code: voucherCodes, status: "Active" },
        });

        // // Trả về danh sách voucher
        return res.json(vouchers);
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
