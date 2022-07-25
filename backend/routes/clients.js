const express = require('express')
const create = require('../controllers/clients/create')
const index = require('../controllers/clients/index')
const update = require('../controllers/clients/update')
const destroy = require('../controllers/clients/destroy')
const router = express.Router()


const auth = require('../middleware/auth')
router.post('/', auth, create)
router.get('/', auth, index)
router.put('/:id', auth, update)
router.delete('/:id', auth, destroy)

module.exports = router