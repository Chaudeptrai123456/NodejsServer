const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./User");
db.product = require("./Product")
db.order = require("./Order")
db.review = require("./Review")
// create index for product list array
// db.order.createIndexes({product:1})


module.exports = db;