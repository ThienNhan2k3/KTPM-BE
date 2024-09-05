const ItemService = require("./services/itemService");
const VoucherService = require("./services/voucherService");


async function app() {
    // const a = await ItemService.giveRandomItemToUser("8fb6b6b8-defe-4073-80b8-64b6d0f20663", "c4fb5c4d-4ef7-4c43-b978-4bfab379dce2", 1);
    console.log(await VoucherService.findVouchersByEventId("c4fb5c4d-4ef7-4c43-b978-4bfab379dce2"));
}

app();