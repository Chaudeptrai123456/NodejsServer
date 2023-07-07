// const Product = require("../model/Product")
const db = require("../model/db")
const {
    sendMessageToQueue,
    receiveMessageFromQueue
} = require("./rabbitmp")
const {
    hSetPromise,
    hGetPromise,
    setPromise,
    getPromise
} = require("../service/Utils/redisService")

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
const handleverifyOrderandSendEmail = async (orderID) => {
    const order = await db.order.findById(orderID)
    order.status = "verify"
    await order.save()
    return order
}
const isOrderVerify = (orderID) => {
    const order = db.order.findById(orderID)
    return order.status == "verify"
}
const addProducttoOrder = async (orderID, productID, quantity) => {
    try {
        const order = await db.order.findById(orderID)
        const product = await db.product.findById(productID)
        order.product.push({
            product: product,
            quantity,
            date: date,

        })
        order.total += product.price
        await order.save()
        return order


    } catch (err) {
        console.log(err)
        return err
    }
}
const handleVerifyOrder = async (orderID) => {
    const order = await db.order.findById(orderID)
    order.status = "verify"
    await order.save()
    return order
}

const size = 10
module.exports = {
    handleCreateNewOrder: async (userID, email) => {
        let order = await createNewOrder(userID, email)
        return order
    },
    handleGetAllProduct: async () => {
        const result = await db.order.find()
        return result
    },
    handleAddProducttoOrder: async (orderID, productID, quantity) => {
        const result = await addProducttoOrder(orderID, productID, quantity)
        //sendMessageToQueue("verifyOrder", result._id)
        // const message =  await receiveMessageFromQueue("verifyOrder")
        // console.log("handleAddProducttoOrder "+message)
        return result
    },
    sendVerifyOrder: async (orderID) => {
        const result = await handleverifyOrderandSendEmail(orderID)
        return result
    },
    handleVerifyOrder: async (orderID) => {
        const order = await handleVerifyOrder(orderID)
        // sendMessageToQueue("verifyOrderandSendEmail",order._id)
        return order
    },

}