require('./server/config/config')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const port = process.env.PORT
const uri = process.env.MONGODB_URI

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.locals.moment = require('moment')

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('connected to DB...'))
  .catch((err) => console.log('Failed to connect to DB...', err))



app.listen(port, () => console.log(`now-fashion running on http://localhost:${port}`))