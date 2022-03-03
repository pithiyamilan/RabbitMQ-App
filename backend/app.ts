import express from 'express';
import cookieParse from 'cookie-parser';
import bodyParser from 'body-parser';
import {error as errorMiddleware} from './middlewares/index';
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParse());

//routes
const queue = require('./routes/queue');

app.use("/queue",queue);

app.use(errorMiddleware);

module.exports = app;