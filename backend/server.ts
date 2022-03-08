const app = require('./app');
import dotenv from 'dotenv';
import { receiverHello } from './utils/index';

dotenv.config({path:'backend/config/config.env'})

receiverHello();

app.listen(process.env.PORT,()=>{
    console.log(`Application started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})