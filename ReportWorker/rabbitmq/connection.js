const amqplib = require("amqplib");
const amqpUrlCloud = "amqps://aeqbngnj:gTpei3EWQv_ryUASM6k8yYsnR03JF5tG@armadillo.rmq.cloudamqp.com/aeqbngnj";


class RabbitMQConnection {
    constructor() {
        this.connect()
        .then(_ => console.log("Connect RabbitMQ sucecssfully"))
        .catch(err => console.error(err));
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

    async receiveFromTopicExchange(nameExchange, topic, cb) {
        try {
            if (!this.channel) {
                await this.connect();
            }
            //Create exchage
            await this.channel.assertExchange(nameExchange, "topic", {
                durable: false
            });

            //Create queue
            const {queue} = await this.channel.assertQueue("", {
                exclusive: true
            });

            console.log(`NameQueue::: ${queue}`);

            //Binding
            
            await this.channel.bindQueue(queue, nameExchange, topic);
            await this.channel.consume(queue, msg => {
                console.log("Message: ", msg.content.toString())
                const obj = JSON.parse(msg.content); 
                cb(obj);
            }, {
                noAck: true
            })
    
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
