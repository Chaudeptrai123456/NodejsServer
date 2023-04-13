const mongoose = require("mongoose")
const OrderSchema = new mongoose.Schema({
  
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    email:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        require:true
    },
    //
    product:{
        type:[{
            product:{type:mongoose.Schema.Types.ObjectId,ref:"product"},
            quantity:Number,
            date: Date
        }],
        require:true
    },
    total:{
        type:Number,
        require:true
    },
    status:{
        type:String,
        default:"processing",
        require:true

    }
})
const Order = mongoose.model("Order",OrderSchema)
module.exports = Order