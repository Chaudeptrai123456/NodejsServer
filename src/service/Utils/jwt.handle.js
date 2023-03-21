const jwt = require("jsonwebtoken")
require("dotenv").config()
const keyRefresh = process.env.Key_RefreshToken
const keyAccess = process.env.Key_AccessToken
const generateRefreshToken = async (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role
    }
    const refreshToken = jwt.sign(
        payload,
        keyRefresh, {
            expiresIn: "30d"
        }
    );
    return refreshToken
}
const generateAccessToken = async (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role
    }
    const accessToken = jwt.sign(payload,keyAccess, {
        expiresIn: "15m"
    })

    return accessToken
}
const verifyToken = async (token, type) => {
    return new Promise((res, rej) => {
        if (type==="access"){
            const result =  jwt.verify(token,keyAccess)
            return res(result)
        }
        else if (type==="refresh"){
            const result =  jwt.verify(token,keyRefresh)
            return res(result)
        }
    })
}
 
module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken
}