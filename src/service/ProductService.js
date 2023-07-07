const db = require("../model/db")
const Product = db.product
const size = 5
const createproduct = async (newProduct) => {
    const product = Product(newProduct)
    product.save().then(() => console.log("create product")).catch(err => console.log("product create error " + err))
    return product
}
const getAllProduct = async()=>{
    const products = await Product.find().lean()
    return products
}

const getProductfindName = async(name)=>{
    const result = await Product.findOne({nameProduct:{tags:name}})
    return result
}
// const result = await A.find({ asd: { $regex: /a/ } });
const createReview= async(productID,userID,description,rate)=>{
    const result = await db.order.create({
        userID,
        productID,
        rate,
        description
    })
    return result
}
const getProductFromPage = async(page)=>{
    let result  = await db.product.find().skip((page-1)*size).limit(size)
    return result
}
module.exports = {
    handlecreateproduct: async (newProduct) => {
        const result = await createproduct(newProduct)
        return result
    },
    handleFindAllProduct : async()=>{
        const result = await getAllProduct()
        return result
    },
    handleFindByName:async(name)=>{
        const res = getProductfindName(name)
        return res
    },
    handleCreateReview:async(productID,userID,description,rate)=>{
        const result = await createReview(productID,userID,description,rate)
        return result
    },
    handlePagination : async(page)=>{
        let result =  await getProductFromPage(page)
        return result
    }
}