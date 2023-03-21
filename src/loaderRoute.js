const auth = require("../src/Route/UserRouter")
const product = require("../src/Route/ProductRouter")
const order = require("../src/Route/OrderRouter")
module.exports = {
    loadRoute:(app)=>{
        auth.route(app)
        product.route(app)
        order.route(app)
    }
}