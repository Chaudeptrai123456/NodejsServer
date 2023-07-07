const axios = require("axios")
const redis = require("../service/Utils/redisService.js")

const {
    get_profile_data,
    get_access_token
} = require("../connenct/google_apis")
const db = require("../model/db")
const User = db.user
const isEmailUnique = async (email) => {
    const temp = User.findOne({
        email: email
    }).lean().data
    if (temp) {
        return false
    } else {
        return true
    }
}
const createNewUser = async (newUser) => {
    const user = new User({
        email: newUser.email,
        userName: newUser.userName
    })

    user.save().then(() => console.log("create")).catch((err) => console.log(err))
}
const findUserByEmail = async (email) => {
    const result = await User.findOne({
        email
    }).lean()
    return result
} 
const findUserbyID= (_id) => {
    const result =  User.findById(_id).lean()
    return result
}
module.exports = {
    handleAuth: async (code) => {
        const token = await get_access_token(code)
        const result = await get_profile_data(token.data.access_token)
        const email = result.data.email
        const check = await isEmailUnique(email)

        if (!check) {
            const temp = {
                email: result.data.email,
                userName: result.data.given_name + " " + result.data.family_name
            }
            const newUser = await createNewUser(temp)
            return newUser
        } else {
            const user = await findUserByEmail(email)
            return user
        }
    },
    handleFindProfile:async(user)=>{
        const userIDRedis = "userID:"+user._id
        let check  = await redis.iskeyExists(userIDRedis)
        let result = {}
        console.log(check)
        if (check === 0) {
            let temp = await findUserbyID(user._id)
            console.log("temp")
            await redis.hSetPromise({
                key:"userID:"+user._id,
                value: {
                    "_id":temp._id.toString(),
                    "email":temp.email,
                    "userName":temp.userName,
                    "roles":'USER',
                    "__v":0
                }
    
            })
            let result1 = await redis.hGetPromise(userIDRedis)
            result = result1
        } else {
            console.log("false ")
            result = await redis.hGetPromise(userIDRedis)
        }
        return result
    }
}