const controller = require("../Controller/ProductRouter")
const  {checkAccessToken} = require("../middleware/middleware.role")
const router = require("express").Router()
module.exports={
    route: (app) => {
        router.get("/addneworder",checkAccessToken,controller.getAllProduct)
        app.use("/order", router)
}
}