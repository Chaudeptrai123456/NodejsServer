const ProductService = require("../service/ProductService")
const {
    handlecreateproduct,
    handleFindByName,
    handleFindAllProduct
} = require("../service/ProductService")
module.exports = {
    getAllProduct: async(req, res) => {
        const result = await handleFindAllProduct()
        return res.status(200).json({result})
    },
    createProduct: async (req, res) => {
        const {
            productName,
            price,
            spec
        } = req.body
        const newProduct = {
            productName,
            price,
            spec
        }
        const result = await handlecreateproduct(newProduct)
        return res.status(200).json({
            result
        })
    },
    findProduct: async(req,res)=>{
        const {nameProduct} = req.body
        const listProduct = await handleFindByName(nameProduct)
        return res.status(200).json({
            result: listProduct
        })
    },
    createReview: async(req,res)=>{
        const {
            productID,userID,description,rate
        } = req.body
        ProductService.handleCreateReview(productID,userID,description,rate)
        return res.status(200).json({result})
    }
}