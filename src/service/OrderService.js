const db = require("../model/db")
const Order = db.order

const createNewOrder = async(newOrder) =>{
    const order =   Order(newOrder)
    order.save().then(()=>console.log("create order")).catch(err=>console.log("create order err" + err))
    return order
}

module.exports = {
    handleCreateNewOrder: async (newOrder) => {
        const result = await createNewOrder(newOrder)
        return result
    },
     
}