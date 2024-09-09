const {Voucher, Voucher_In_Event, User_Voucher} = require("../models");

class VoucherService {
    static async findVouchersByEventId(eventId) {
        const option = {
            include: [{
                model: Voucher_In_Event,
                where: {
                    id_event: eventId
                }
            }]
        };
        return Voucher.findAll(option);
    }

    static async findVoucherByCode(voucher_code) {
        return Voucher.findAll({
            where: {
                voucher_code
            }
        });
    }

    static async setVoucherToUser(userId, voucherInEventId, quantity=1) {
        try {
            const voucherInEvent = await Voucher_In_Event.findOne({
                where: {
                    id: voucherInEventId,
                },
            });
            if (voucherInEvent.total_quantity < 1) {
                return null;
            } 
            
            
            const [userVoucher, created] = await User_Voucher.findOrCreate({
                where: {  
                    id_voucher: voucherInEventId,
                    id_user: userId, 
                },
                defaults: {
                    id_voucher: voucherInEventId,
                    id_user: userId,
                    quantity: quantity,
                    time_update: new Date(),
                    used: 0
                },  
            })
            if (!created) {
                userVoucher.quantity += quantity;
                await userVoucher.save();
            }
    
    
            voucherInEvent.total_quantity -= 1;
            await voucherInEvent.save();
    
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
        
    } 
}



module.exports = VoucherService;