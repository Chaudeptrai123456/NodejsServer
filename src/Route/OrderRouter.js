const  {checkAccessToken} = require("../middleware/middleware.role")
const controller  = require("../Controller/OrderController")
const router = require("express").Router()
module.exports={
    route: (app) => {
        router.post("/addneworder",controller.handleCreateOrder)
        router.patch("/addproducttocart" ,controller.handleAddProductToOrder)
        router.post("/verify" ,controller.handVerifyOrder)
        app.use("/order", router)
    }
}