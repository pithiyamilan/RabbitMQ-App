const amqp = require('amqplib');

export const queueConnection = async (config: any): Promise<any | undefined> => {
    // amqp.connect(config, ((error0:any, connection:any) => {
    //     if (error0) {
    //         console.log("RabbtiMQ Connection Error." + error0);
    //         return;
    //     }
    //     console.log("q");
    //     return connection;
    // }));
    //  console.log("ad");
    return amqp.connect(config,{});
};

export const queueChannel = async (connection: any): Promise<any | undefined> => { 
    // connection.createChannel((error1:any, channel:any) => {
    //         if (error1) {
    //             console.log("RabbitMQ channel Error." + error1);
    //             return;
    //         }
    //         return channel;
    //     });
    return connection.createChannel();
};
