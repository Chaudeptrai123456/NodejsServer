const  {checkAccessToken} = require("../middleware/middleware.role")
const controller  = require("../Controller/OrderController")
const router = require("express").Router()
module.exports={
    route: (app) => {
        router.post("/addneworder",checkAccessToken,controller.handleCreateOrder)
        app.use("/order", router)
}
}