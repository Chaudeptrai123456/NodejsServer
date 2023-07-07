const {
    hSetPromise,
    hGetPromise,
    setPromise,
    getPromise,
    iskeyExists
} = require("../service/Utils/redisService")
module.exports = {
    authroizeProfile:async(req,res,next)=>{
        try {
            let temp = await iskeyExists("userid:"+req.user._id)
            console.log(temp === 0)
            next()
        } catch(err) {
            console.log(err)
            return res.status(403).json({err})
        }
    }
}