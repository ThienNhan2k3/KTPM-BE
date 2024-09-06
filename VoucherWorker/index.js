const rabbitmqConnection = require("./rabbitmq/connection");
const VoucherService = require("./services/voucherService");
require("dotenv").config();

async function setVoucherToUser(obj) {
    return await VoucherService.setVoucherToUser(obj.userId, obj.voucherInEventId, obj.quantity);
}

const protypeVouchersExchange = {
    "setVoucherToUser": setVoucherToUser
}


const app = async () => {
    for(let [key, value] of Object.entries(protypeVouchersExchange)) {
        rabbitmqConnection.receiveFromTopicExchange("vouchers", key, value);
    }
}

app();