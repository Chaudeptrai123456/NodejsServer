// const Product = require("../model/Product")
const db = require("../model/db")
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
module.exports = {
    handleCreateNewOrder: async (userID, email) => {
        const result = await createNewOrder(userID, email)
        return result
    },
    handleAddProducttoOrder: async (orderID, productID, quantity, email) => {
        const result = await addProducttoOrder(orderID, productID, quantity, email)
        return result
    }
}