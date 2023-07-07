const router = require("express").Router()
const controller = require("../Controller/UserController")
const {checkAccessToken} = require("../middleware/middleware.role")
const redis  =require("../middleware/redis.middlewave")
module.exports = {
        route: (app) => {
                router.get("/login", controller.login)
                router.get("/auth/google/callback",controller.handleOauth)
                router.get("/auth/profile",checkAccessToken,controller.handleProfile)
                router.get("/auth/getRefreshToken",controller.getRefreshToken)
                router.get("/test",controller.test)
                //test token
                app.use("/", router)
        }
}