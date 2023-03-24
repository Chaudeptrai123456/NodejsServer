const controller = require("../Controller/ProductController")
const  {checkAccessToken} = require("../middleware/middleware.role")
const router = require("express").Router()
module.exports={
    route: (app) => {
        router.get("/getallproduct",checkAccessToken,controller.getAllProduct)
        router.post("/createProduct",checkAccessToken,controller.createProduct)
        app.use("/product", router)
}
}