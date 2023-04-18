const amqplib = require("amqplib")
const amqplib_url = "amqps://kntazpmi:7ZsP2i1Bv5MD5QozAZiB_u3fK5Sd1M3d@armadillo.rmq.cloudamqp.com/kntazpmi"
// const amqplib_docker = "docker"
const connect = async () => {
    try {
        const conn = await amqplib.connect(amqplib_url)
        return conn
    } catch (err) {
        console.log(err.message)
    }
}
const createChannel = async (conn) => {
    const channel = await conn.createChannel()
    return channel
}
const createQueue = async(channel,nameQueue)=>{
    await channel.assertQueue(nameQueue, {
        durable: false,
    })
}
const sendMessage = async (nameQueue, channel,order) => {
    await channel.sendToQueue(nameQueue, Buffer.from(JSON.stringify(order)))
}
const receiveMessage = async(channel,nameQueue)=>{
    await channel.consume(nameQueue,(msg) =>
    {
        return msg
    },{
        noAck:true
    })
}
const sendMessageToQueue = async (nameQueue,object) => {
    try {
        const conn = await connect()
        const channel = await createChannel(conn)
        await createQueue(channel,nameQueue)
        await sendMessage(nameQueue,channel,object)
    } catch (err) {
        console.log(err.message)
    }
}
const receiveMessageFromQueue = async (nameQueue)=>{
        const conn = await connect()
        const channel = await createChannel(conn)
        await createQueue(channel,nameQueue)
        await receiveMessage(channel,nameQueue)
}
module.exports = {sendMessageToQueue,receiveMessageFromQueue}