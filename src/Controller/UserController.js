const service = require("../service/HandleLogin.Oauth")
const {
    request_get_auth_code_url
} = require("../connenct/google_apis")
const {
    generateAccessToken,generateRefreshToken,verifyToken
} = require("../service/Utils/jwt.handle")

module.exports = {

    login: (req, res) => {
        console.log("login")
        res.redirect(request_get_auth_code_url)
    },
    handleOauth: async (req, res) => {
        const authorization_token = req.query.code
        const userInfo = await service.handleAuth(authorization_token)
        const access = await generateAccessToken(userInfo)
        const refresh = await generateRefreshToken(userInfo)
        const a = await verifyToken(access,"access")
        console.log(a)
        return res.status(200).json({access,refresh})
    }
}