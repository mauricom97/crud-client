const _ = require('lodash')
require('../../db/models/Client')
module.exports = async (req, res) => {
    try {
        const requestData = extractData(req)
        await analyseData(requestData)
        const client = await createClient(req, requestData)
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
    const contentRequest = _.cloneDeep(request)
    try{
        if(!contentRequest.id)
            throw Error('Id is required')
    }catch(error){
        console.log(error)
        throw Error(error.message)
    }
}

async function createClient(req, request) {
    const client = _.cloneDeep(request)
    try {
        const clientRegister = await new req.mongoose.model('clients')
        const updateClient = await clientRegister.remove({_id: client.id})
        return updateClient
    } catch (error) {
        console.log(error)
        throw Error(error.message)
    }
}