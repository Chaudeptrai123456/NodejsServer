// const { redis } = require("googleapis/build/src/apis/redis")
const mongoose = require("mongoose")
const ProductSchema = new mongoose.Schema({
    productName:{
        type:String,
        require:true,
        unique:true
    },
    price:{
        type:Number,
        require:true
    },
    spec:{
        type:[Object],
        default:[{color:"red",version:30}]
    }
}) 
const Product =  mongoose.model("Product",ProductSchema)
module.exports = Product