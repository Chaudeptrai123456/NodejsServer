const router = require("express").Router()
const controller = require("../Controller/UserController")
const {checkAccessToken} = require("../middleware/middleware.role")
module.exports = {
        route: (app) => {
                router.get("/login", controller.login)
                router.get("/auth/google/callback",controller.handleOauth)
                //test token
                app.use("/", router)
        }
}