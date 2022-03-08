import {queueConnection,queueChannel} from '../config/index';

export const receiverHello = async() => {
    const qConnection = await queueConnection(process.env.RABBITMQ_URL);
    if (!qConnection) { 
        console.log("RabbitMQ Connection Refused.");
    }
    const qChannel = await queueChannel(qConnection);
    if (!qChannel) { 
         console.log("RabbitMQ Channel Connection Refused.");
    }
    const queue = "hello";
    await qChannel.assertQueue(queue, {
      durable: true,
    });
    qChannel.consume(queue, ((message:any) => {
        if (message.content) { 
            console.log("First",message.content.toString());
        }
    }), { noAck: true });
    qChannel.consume(queue, ((message:any) => {
        if (message.content) { 
            console.log("second",message.content.toString());
        }
    }),{noAck: true});
};