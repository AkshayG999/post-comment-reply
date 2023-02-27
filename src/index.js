
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const port=process.env.PORT || 4000;

app.use(cors({
    origin: ['http://localhost:3000', 'https://client.dggtyh77ra2h8.amplifyapp.com']
}))


app.use(express.json())

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log("MongoDB is Connected"))
    .catch((err) => console.log(err))

app.use('/', require('./routes/route'))

app.use('/*', (req, res) => res.status(400).send({ message: "Invalid HTTP End Point" }))

app.listen(port, () => console.log("Server Is Running On " +port))
