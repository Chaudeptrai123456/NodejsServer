const {handleCreateNewOrder} = require("../service/OrderService")
module.exports = {
    handleCreateOrder:async(req,res)=>{
        const {
            userName,product,total
        } = req.body
        const newOrder = { userName,product,total}
        const result = await handleCreateNewOrder(newOrder)
        return res.status(200).json({result})
    }
}