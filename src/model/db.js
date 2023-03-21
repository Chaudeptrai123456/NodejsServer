const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./User");
db.product = require("./Product")
db.order = require("./Order")

module.exports = db;