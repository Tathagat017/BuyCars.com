const env = require("env2")(".env");

const mongoose = require("mongoose"); //interaction of dB with mongoose

const url = process.env.DB_URL;

const connection = mongoose.connect(url);

module.exports = { connection };
