const _ = require('lodash')

module.exports = async (req, res, next) => {
    
    req.mongoose = require('mongoose')

    next()

}