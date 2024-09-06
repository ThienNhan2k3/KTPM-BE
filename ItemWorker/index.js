const rabbitmqConnection = require("./rabbitmq/connection");
const ItemService = require("./services/itemService");
require("dotenv").config();

async function deleteEachItemOfUserInEvent(obj) {
    for (let i = 0; i < obj.items.length; i++) {
        await ItemService.deleteItemOfUser(obj.userId, obj.items[i].id);
    }
}

const protypeItemsExchange = {
    "deleteEachItemOfUserInEvent": deleteEachItemOfUserInEvent
}


const app = async () => {
    for(let [key, value] of Object.entries(protypeItemsExchange)) {
        rabbitmqConnection.receiveFromTopicExchange("items", key, value);
    }
}

app();