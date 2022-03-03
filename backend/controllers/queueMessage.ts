const errorHandler = require("../utils/errorHandler");
import { catchAsyncErrors } from '../middlewares/index';
import {queueConnection,queueChannel} from '../config/index';

const errorMessage = "Something went wrong please try again.";

export const camIntiate = catchAsyncErrors(async (req: any, res: any, next: any) => {
    //const { requestData: { userID, password } } = req.body;
    //console.log(userID, password);
    console.log(process.env.RABBITMQ_URL);
    const qConnection = await queueConnection(process.env.RABBITMQ_URL);
    console.log("fe");
    if (!qConnection) { 
         return next(new errorHandler(errorMessage, "99", "-99", "RabbitMQ Connection Refused.","Error while RabbitMQ connection.", 400));
    }
    const qChannel = await queueChannel(qConnection);
    if (!qChannel) { 
        return next(new errorHandler(errorMessage, "99", "-99", "RabbitMQ Channel Connection Refused.","Error while RabbitMQ Channel connection.", 400));
    }
    const queue = 'hello';
    qChannel.assertQueue(queue, {
      durable: false
    });
    qChannel.sendToQueue(queue, Buffer.from(req.body));
    qConnection.close();
    res.json({
        status: "0", responseData: { message: "CAM Initiate successfully." }
    });
});