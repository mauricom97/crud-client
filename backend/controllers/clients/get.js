const _ = require('lodash')
require('../../db/models/Client')

module.exports = async (req, res) => {
    try {
        const requestData = extractData(req)
        await analyseData(requestData)
        const client = await getClient(req, requestData)
        return res.send(client)
    } catch (error) {
        console.log(error)
        return res.send(error.message)
    }
}

function extractData(_req) {
    try {
        const req = _.cloneDeep(_req)
        const { id } = req.params
        return { id }
    } catch (error) {
        console.log(error)
        throw Error(error.message)
    }
}

async function analyseData(request) {
    if(!request){
        throw Error('idClient is required')
    }
}

async function getClient(req, request) {
    try {
        console.log(request)
        const client = await new req.mongoose.model('clients')
        const resultClient = await client.findOne({_id: request.id})
        return resultClient
    } catch (error) {
        console.log(error)
        throw Error(error.message)
    }
}