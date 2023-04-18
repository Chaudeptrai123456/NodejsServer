const {receiveMessageFromQueue}  = require("../rabbitmp")
const {handleVerifyOrder} = require("../OrderService")
module.exports ={
    handleVerify : async()=>{
        await receiveMessageFromQueue("verifyOrder")
        .then( async(result)=>{
            const temp = await handleVerifyOrder(result)
            console.log(temp)
        })
    }
}