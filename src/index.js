
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

app.use(cors({
    origin: 'http://localhost:3000'
}))


app.use(express.json())

mongoose.set('strictQuery', false)
mongoose.connect(process.env.url, { useNewUrlParser: true })
    .then(() => console.log("MongoDB is Connected"))
    .catch((err) => console.log(err))

app.use('/', require('./routes/route'))

app.use('/*', (req, res) => res.status(400).send({ message: "Invalid HTTP End Point" }))

app.listen(process.env.port, () => console.log("Server Is Running On " + process.env.port))