const mongoose = require("mongoose")
const ReviewSchema = mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    productID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        require:true

    },
    description:{
        type:String,
        default:""
    },
    rate:{
        type:Number,
        require:true
    }
})
const Review = mongoose.model("Review",ReviewSchema)
module.exports = Review