const amqplib = require("amqplib")
require("dotenv").config
const amqplib_url = process.env.rabbitmq_url
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
const createQueue = async (channel, nameQueue) => {
    await channel.assertQueue(nameQueue, {
        durable: false,
    })
}
const sendMessage = async (nameQueue, channel, order) => {
    await channel.sendToQueue(nameQueue, Buffer.from(JSON.stringify(order),{persistent:true}))
}
// const receiveMessage = async (channel, nameQueue) => {
//     await channel.consume(nameQueue, function (msg) {
//         return msg
//     }, {
//         noAck: true
//     })
// }
const sendMessageToQueue = async (nameQueue, object) => {
    try {
        const conn = await connect()
        const channel = await createChannel(conn)
        await createQueue(channel, nameQueue)
        await sendMessage(nameQueue, channel, object)
    } catch (err) {
        console.log(err.message)
    }
}
const receiveMessageFromQueue = async (nameQueue) => {
    console.log("handle the message from queue")
    const conn = await connect()
    const channel = await createChannel(conn)
    await channel.consume(nameQueue, function (msg) {
        console.log("message "+msg.content.toString())
    }, {
        noAck: true
    })
     
}
module.exports = {
    sendMessageToQueue,
    receiveMessageFromQueue
}