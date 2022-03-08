const express = require('express')
const router = require('./Router/app.routes')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const logger = require('./Log/logFiles')
const dotenv = require('dotenv')
const app = express()
dotenv.config()

mongoose.connect('mongodb://localhost:27017/Login', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
    console.log(`Opps! there is an Error in the Database Connectivity!`)
})

db.once('open',() =>{
    console.log(`Mongo - Server is Running`)
})

app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(router)

let PORT = process.env.PORT || 8080

app.listen(PORT, ()=>{
    console.log(`Server is there on PORT - ${PORT}`)
})