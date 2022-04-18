const errorHandler = require("../utils/errorHandler");
import { catchAsyncErrors } from '../middlewares/index';
import {queueConnection,queueChannel} from '../config/index';

const errorMessage = "Something went wrong please try again.";

export const camIntiate = catchAsyncErrors(async (req: any, res: any, next: any) => {
    //const { requestData: { userID, password } } = req.body;
    //console.log(userID, password);    
    const qConnection = await queueConnection(process.env.RABBITMQ_URL);
    if (!qConnection) { 
         return next(new errorHandler(errorMessage, "99", "-99", "RabbitMQ Connection Refused.","Error while RabbitMQ connection.", 400));
    }
    const qChannel = await queueChannel(qConnection);
    if (!qChannel) { 
        return next(new errorHandler(errorMessage, "99", "-99", "RabbitMQ Channel Connection Refused.","Error while RabbitMQ Channel connection.", 400));
    }
    const queue = "hello";
    await qChannel.assertQueue(queue, {
      durable: true,
    });
    await qChannel.sendToQueue(queue, Buffer.from(JSON.stringify(req.body)));
    await qChannel.close();
    await qConnection.close();
    res.json({
        status: "0", responseData: { message: "CAM Initiate successfully." }
    });
});

export const camIntiateTest = catchAsyncErrors(async (req: any, res: any, next: any) => {
    const requestExchange = "AgentForCAMRequest";
    const requestExchangeRouting = "CAMRequest";

    const requestDelayExchange = "AgentForDelayCAMRequest";
    const requestDelayExchangeRouting = "CAMDelayRequest";

    const failedRequestExchange = "CAMFailedRequestQueue";
    const failedRequestExchangeRouting = "CAMFailed";

    const camRequestQueue = "CAMRequestQueue";
    const camFailedRequestQueue = "CAMFailedRequestQueue";

    const qConnection = await queueConnection(process.env.RABBITMQ_URL);
    if (!qConnection) { 
         return next(new errorHandler(errorMessage, "99", "-99", "RabbitMQ Connection Refused.","Error while RabbitMQ connection.", 400));
    }
    const qChannel = await queueChannel(qConnection);
    if (!qChannel) { 
        return next(new errorHandler(errorMessage, "99", "-99", "RabbitMQ Channel Connection Refused.","Error while RabbitMQ Channel connection.", 400));
    };
    
    await qChannel.assertQueue(requestExchange, "direct");
    await qChannel.assertQueue(requestDelayExchange, "direct");
    await qChannel.assertQueue(failedRequestExchange, "direct");

    
    

    await qChannel.close();
    await qConnection.close();
    res.json({
        status: "0", responseData: { message: "CAM Initiate successfully." }
    });
});