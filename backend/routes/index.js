const clients = require('./clients')
const express = require('express');
const app = express()
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: true })

module.exports = (app) => {
  app.use('/clients', jsonParser, urlencodedParser, clients)
}