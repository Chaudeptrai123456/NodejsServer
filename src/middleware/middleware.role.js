const {
    generateAccessToken,
    generateRefreshToken,
    verifyToken
} = require("../service/Utils/jwt.handle")
const checkAccessToken =async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]
        console.log(token)
        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }
        try {
            const decode =   await verifyToken(token, "access")
            req.user = decode
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
        return next();
    }catch(err) {
        return res.status(400),json({err})
    }
}
module.exports = {
    checkAccessToken
}