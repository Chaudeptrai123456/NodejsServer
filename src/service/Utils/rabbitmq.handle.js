const {receiveMessageFromQueue}  = require("../rabbitmp")
module.exports ={
    handleVerify :  async()=>{
        
        await receiveMessageFromQueue("verifyOrder")
    }
}