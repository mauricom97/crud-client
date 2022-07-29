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
        console.log(req.body)
        const { name, cpf, birth_date, email, phone, cep,  address, city, state, district, notes } = req.body
        return { name, cpf, birth_date, email, phone, cep,  address, city, state, district, notes }
    } catch (error) {
        console.log(error)
        throw Error(error.message)
    }

}

async function analyseData(request) {
    const contentRequest = _.cloneDeep(request)
    try{
        if(!contentRequest.name)
            throw Error('Name is required')
        if(!contentRequest.cpf)
            throw Error('CPF is required')
    }catch(error){
        console.log(error)
        throw Error(error.message)
    }
}

async function createClient(req, request) {
    const client = _.cloneDeep(request)
    console.log(client)
    try {
        const clientRegister = await new req.mongoose.model('clients')
        const newClient = await new clientRegister(client).save()
        return newClient
    } catch (error) {
        console.log(error)
        throw Error(error.message)
    }
}