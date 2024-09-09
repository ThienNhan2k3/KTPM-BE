const amqplib = require("amqplib");
const amqpUrlCloud = "amqps://aeqbngnj:gTpei3EWQv_ryUASM6k8yYsnR03JF5tG@armadillo.rmq.cloudamqp.com/aeqbngnj";


class RabbitMQConnection {
    constructor() {
        this.connect();
    }

    async connect() {
        if (this.connected && this.channel) return;
        else this.connected = true;

        try {
            console.log(`⌛️ Connecting to Rabbit-MQ Server`);
            this.connection = await amqplib.connect(amqpUrlCloud);

            console.log(`✅ Rabbit MQ Connection is ready`);

            this.channel = await this.connection.createChannel();

            console.log(`🛸 Created RabbitMQ Channel successfully`);

        } catch (error) {
            console.error(error);
            console.error(`Not connected to MQ Server`);
        }
    }

    async sendToTopicExchange(nameExchange, topic, object) {
        try {
            if (!this.channel) {
                await this.connect()
                .then(_ => console.log("Connect RabbitMQ sucecssfully"))
                .catch(err => console.error(err));
            }

            await this.channel.assertExchange(nameExchange, "topic", {
                durable: false
            })
    
            this.channel.publish(nameExchange, topic, Buffer.from(JSON.stringify(object)));
            console.log("Send Okk:", object);
    
        } catch (error) {
          console.error(error);
          throw error;
        }
    }

    static getInstance() {
        if (RabbitMQConnection.instance == null) {
            RabbitMQConnection.instance = new RabbitMQConnection();
        }
        return RabbitMQConnection.instance;
    }
}


const mqConnection = RabbitMQConnection.getInstance();
module.exports = mqConnection; 
