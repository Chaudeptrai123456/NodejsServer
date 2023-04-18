const  {checkAccessToken} = require("../middleware/middleware.role")
const controller  = require("../Controller/OrderController")
const router = require("express").Router()
module.exports={
    route: (app) => {
        router.post("/addneworder",checkAccessToken,controller.handleCreateOrder)
        router.patch("/addproducttocart",checkAccessToken,controller.handleAddProductToOrder)
        router.post("/verify",checkAccessToken,controller.handVerifyOrder)
        app.use("/order", router)
}
}