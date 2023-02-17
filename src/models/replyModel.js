const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Reply', replySchema)

