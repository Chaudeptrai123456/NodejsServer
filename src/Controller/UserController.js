const service = require("../service/HandleLogin.Oauth")
const redis = require("../service/Utils/redisService.js")

// const {
//     request_get_auth_code_url
// } = require("../connenct/google_apis")
// const {
//     generateAccessToken,generateRefreshToken,verifyToken
// } = require("../service/Utils/jwt.handle")
module.exports = {

    login: (req, res) => {
        console.log("login")
        res.redirect(request_get_auth_code_url)
    },
    handleProfile: async (req,res)=>{
        const user = req.user
        let info = await service.handleFindProfile(user)
        return res.status(200).json({user:info})
    },
    handleOauth: async (req, res) => {
        const authorization_token = req.query.code
        const userInfo = await service.handleAuth(authorization_token)
        const access = await generateAccessToken(userInfo)
        const refresh = await generateRefreshToken(userInfo)
        const a = await verifyToken(access,"access")
        return res.status(200).json({access,refresh,user:userInfo,link:""})
    },
    getRefreshToken:async(req,res)=>{
        const refreshToken = await client.get("userid:64a173f158684cf3a60843f8")
        return res.status(200).json({refreshToken})
    },
    test:async(req,res)=>{
        await redis.hSetPromise({
            key:"cart:userid00001",
            value: {
                'product001':1,
                'product002':2
            }

        })
        const temp = await redis.hGetPromise("cart:userid00001")
        console.log("temp "+ typeof(temp))
        return res.status(200).json({temp})
    }
}