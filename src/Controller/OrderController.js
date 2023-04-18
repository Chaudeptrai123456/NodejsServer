const {
    handleCreateNewOrder,
    handleAddProducttoOrder
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
        const {orderID, productID,email} = req.body
        const quantity = parseInt( req.body.quantity)
        const result = await handleAddProducttoOrder(orderID, productID, quantity, email)
        return res.status(200).json({result})
    },
    handVerifyOrder: async(req,res)=>{
        const {orderID} = req.body
        await sendVerifyOrder(orderID)
        .then(() => {return res.status(200).json({message:"verify success"})})
        .catch(err =>{return res.status(400).json({err})})
    }
}