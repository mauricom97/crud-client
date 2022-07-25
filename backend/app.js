const express = require('express')
const logger = require('morgan')
const port = process.env.PORT || 3000
const cors = require('cors')
require('dotenv').config()

require('./db/connect')()

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))

require('./routes/index')(app)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})