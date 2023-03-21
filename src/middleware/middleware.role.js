const {
    generateAccessToken,
    generateRefreshToken,
    verifyToken
} = require("../service/Utils/jwt.handle")
const checkAccessToken =async (req, res, next) => {
    const token = req.headers["x-access-token"]
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decode =   verifyToken(token, "access")
        req.user = decode
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();

}
module.exports = {
    checkAccessToken
}