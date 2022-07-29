const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Cliente = new Schema({
    name: {
        type: String,
        required: true
    },
    birth_date: {
        type: Date,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    cep: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String
    },
    district: {
        type: String
    },
    notes: {
        type: String
    }
})

mongoose.model('clients', Cliente)
