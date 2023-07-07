const redis = require("redis")
require("dotenv").config()
const client  = redis.createClient({
    url:process.env.urlRedis
})
client.connect()
client.on('error',(error)=>console.log("asdas "+error))
module.exports = client