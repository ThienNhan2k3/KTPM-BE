const VoucherService = require("./services/voucherService");
const redis = require("./redis/redisDB");


async function emitEventEnd(eventId) {
    // const vouchers = await VoucherService.findVouchersByEventId(eventId);
  
    const allPlayerScore = await redis.hgetall(`eventQuizes:${eventId}:players`);
    const sortable = Object.entries(allPlayerScore)
      .sort(([,a],[,b]) => b-a)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    
    console.log(sortable);
  
    for (let key of sortable.keys()) {
      console.log(key);
      // VoucherService.setVoucherToUser(key);
    }
  
    const vouchers = await VoucherService.findVouchersByEventId(eventId)
    // const randomVoucher = vouchersInEvent[(Math.floor(Math.random() * vouchersInEvent.length))];
    // const isAsignedVoucher = await  VoucherService.setVoucherToUser(userId, randomVoucher. Voucher_In_Events[0].id, 1)
    // if (isAsignedVoucher) {
    //     return res.json({
    //         code: 200,
    //         item: randomVoucher
    //     });
    // }
  
    vouchers.sort(function(a, b) {
      return b["value"] - a["value"];
    });
  
    console.log(vouchers);
  
    // io.to(eventId).emit("eventEnd", {
    //   allPlayerScore,
    //   voucher: "Voucher 50%",
    // });
  
    
  
    // rabbitmqConnection.sendToTopicExchange("quiz", "emitQuiz", {
    //   eventId, 
    //   message: "eventEnd",
    //   data:  {
    //     allPlayerScore,
    //     voucher: "Voucher 50%",
    //   }
    // })
}

emitEventEnd("dbdcfeeb-b232-4148-893e-1e3564702794");