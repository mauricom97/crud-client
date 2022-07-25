const express = require('express')
const createClient = require('../controllers/clients/create')
const getClient = require('../controllers/clients/get')
const router = express.Router()


const auth = require('../middleware/auth')
router.post('/', auth, createClient)
router.get('/:id', auth, getClient)

module.exports = router