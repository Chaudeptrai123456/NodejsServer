const {
    handleCreateNewOrder,
    handleAddProducttoOrder,
    handleVerifyOrder
} = require("../service/OrderService")
module.exports = {
    handleCreateOrder: async (req, res) => {
        const {
            userID,email
        } = req.body
        const result = await handleCreateNewOrder(userID,email)
        return res.status(200).json({
            result
        })
    },
    handleAddProductToOrder:async(req,res)=>{
        const {orderID, productID} = req.body
        const quantity = parseInt( req.body.quantity)
        const result = await handleAddProducttoOrder(orderID, productID, quantity)
        return res.status(200).json({result})
    },
    handVerifyOrder: async(req,res)=>{
        const {orderID} = req.body
        const result  =  await handleVerifyOrder(orderID)
        return res.status(200).json({result})
    }
}