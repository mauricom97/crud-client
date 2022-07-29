const mongoose = require('mongoose')
module.exports = () => {
    mongoose.Promise = global.Promise
    mongoose.mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true
    }).then(() => {
        console.log('Connected to MongoDB')
    }).catch((err) => {
        console.log(err)
    })
}


// const client = mongoose.model('clients')


// try {
//     createClient({
//         name: 'John Doe',
//         birth_date: new Date(),
//         cpf: '12345678901',
//         email: 'admin@admin.com',
//         phone: '+5511999999999',
//         address: 'Rua dos Bobos',
//         city: 'São Paulo'
//     })
//     async function createClient(newClient) {
//         const clientRegister = await new client(newClient).save()
//         console.log(clientRegister)
//     }
// } catch (error) {
//     console.log(error)
// }
