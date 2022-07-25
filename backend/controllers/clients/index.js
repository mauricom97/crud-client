const _ = require('lodash')
require('../../db/models/Client')

module.exports = async (req, res) => {
    try {
        const client = await getClients(req, requestData)
        return res.send(client)
    } catch (error) {
        console.log(error)
        return res.send(error.message)
    }
}

async function getClients(req, request) {
    try {
        const client = await new req.mongoose.model('clients')
        const resultClient = await client.find()
        return resultClient
    } catch (error) {
        console.log(error)
        throw Error(error.message)
    }
}