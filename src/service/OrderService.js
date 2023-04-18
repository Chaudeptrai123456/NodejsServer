// const Product = require("../model/Product")
const db = require("../model/db")
const {sendMessageToQueue} = require("./rabbitmp")
const Order = db.order
const date = new Date()
const createNewOrder = async (userID, email) => {
    const order = Order({
        userID,
        email,
        date,
        product: [],
        total: 0
    })
    order.save().then(() => console.log("create order")).catch(err => console.log("create order err" + err))
    return order
}
const addProducttoOrder = async (orderID, productID, quantity, email) => {
    try {
        const order = await db.order.findById(orderID)
        const product = await db.product.findById(productID)
        order.product.push({
            product: product,
            quantity,
            date: date,
        })
        order.total += product.price
        order.save().then(() => console.log("create order")).catch(err => console.log("create order err" + err))
        return order
    } catch (err) {
        return err
    }
}
// const handleVerifyOrder = async(orderID)=>{
//     const order = await db.order.findById(orderID)
//     order.status == "verify"
//     await order.save().then(()=>{return "verify success"}).catch(()=>{return "failure"})
// }
module.exports = {
    handleCreateNewOrder: async (userID, email) => {
         await createNewOrder(userID, email)
    },
    handleAddProducttoOrder: async (orderID, productID, quantity, email) => {
        const result = await addProducttoOrder(orderID, productID, quantity, email)
        // .then(async (result)=>{
        //     await sendMessageToQueue("test",result).then(async()=>{
        //         await receiveMessageFromQueue("test")
        //     })
        //     return result
        //  })
        //  .catch(err=>{return err})
        return result
    },
    sendVerifyOrder:async (orderID)=>{
        await sendMessageToQueue("verifyOrder",orderID)
    },
    handleVerifyOrder:async(orderID)=>{
        const order = await db.order.findById(orderID)
        const array = order.product
        array.forEach(i=>console.log(i))
        order.status = "verify"
        await order.save()
        return order
    }
}