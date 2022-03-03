import express from 'express';
import cookieParse from 'cookie-parser';
import bodyParser from 'body-parser';
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParse());

module.exports = app;