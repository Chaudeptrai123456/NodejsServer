const client = require("../../connenct/redis")
module.exports = {
    hSetPromise: async ({
        key,
        value
    }) => {
        try {
            await client.hSet(key, value,(err,data)=>{
                if (!err) {
                    return result(data)
                } else {
                    return reject(err)
                }
            }) 

        } catch (err) {
            return err
        }
    },
    hGetPromise: async (key) => {
        try {
            return new Promise(async (result, reject) => {
                let temp = await client.hGetAll(key)
                return result(temp)
            })
        } catch (err) {
            return err
        }
    },
    setPromise: async ({
        key,
        value
    }) => {
        try {
            return new Promise(async (result, reject) => {
                let temp = await client.set(key, value)
                client.scan
                return result(temp)
            })
        } catch (err) {
            return err
        }
    },
    getPromise: async (key) => {
        try {
            return new Promise(async (result, reject) => {
                let temp = await client.get(key)
                return result(temp)
            })
        } catch (err) {
            return err
        }
    },
    listPush: async (list, array) => {
        try {
            return new Promise(async (result, reject) => {
                let a = await client.lPush(list, array)
                return result(a)
            })
        } catch (err) {
            return err
        }
    },
    iskeyExists: async (key) => {
        try {
            return new Promise(async (result, reject) => {
                let check = await client.exists(key)
                return result(check)
            })
        } catch (err) {
            return err
        }
    },
    getAllKey: async (key) => {
        try {
            return new Promise(async (result, reject) => {
                let temp = await client.lRange(key, 0, -1)
                return result(temp)
            })
        } catch (err) {
            return err
        }
    }
}