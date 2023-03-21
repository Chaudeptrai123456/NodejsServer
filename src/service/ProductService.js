const db = require("../model/db")
const Product = db.product
const createproduct = async (newProduct) => {
    const product = Product(newProduct)
    product.save().then(() => console.log("create product")).catch(err => console.log("product create error " + err))
    return product
}
const getAllProduct = async()=>{
    const products = await Product.find().lean()
    return products
}
module.exports = {
    handlecreateproduct: async (newProduct) => {
        const result = await createproduct(newProduct)
        return result
    },
    handleFindAllProduct : async()=>{
        const result = await getAllProduct()
        return result
    }
}