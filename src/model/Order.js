const mongoose = require("mongoose")
const OrderSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    product:{
        type:[Object],
        require:true
    },
    total:{
        type:Number,
        require:true
    }
})
const Order = mongoose.model("Order",OrderSchema)
module.exports = Order