const rabbitMQConnection = require("../database/rabbitmq/connection");

const nameExchange = "items"
rabbitMQConnection.sendToExchange(nameExchange, "fanout", {id: 1, name: "Hello"});