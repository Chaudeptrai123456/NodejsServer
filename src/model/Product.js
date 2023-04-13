// const { redis } = require("googleapis/build/src/apis/redis")
const mongoose = require("mongoose")

//the attribute design pattern
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
    quantity:{
        type:Number,
        require:true
    },
    // specific field is { k : '', v '',u ''}
    spec:{
        type:[Object],
        default:[{k:"color",v:"red",u:""}]
    }
}) 
const Product =  mongoose.model("Product",ProductSchema)
module.exports = Product