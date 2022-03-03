const express = require("express");
const queue = express.Router();
import { camIntiate } from '../controllers/index';

queue.route("/cam/msg/initiate").post(camIntiate);

module.exports = queue;