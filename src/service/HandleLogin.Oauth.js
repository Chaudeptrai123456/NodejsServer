const axios = require("axios")
const {
    get_profile_data,
    get_access_token
} = require("../connenct/google_apis")
const db = require("../model/db")
const User = db.user
const isEmailUnique = async (email) => {
    const temp = User.findOne({
        email: email
    }).lean()
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
module.exports = {
    handleAuth: async (code) => {
        const token = await get_access_token(code)
        const result = await get_profile_data(token.data.access_token)
        const email = result.data.email
        const check = await isEmailUnique(email)
        if (check) {
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
    }
}