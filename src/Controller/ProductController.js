const {
    handlecreateproduct,
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
    }
}