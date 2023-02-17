const replyModel = require('../models/replyModel')


const createReply = async (req, res) => {
    try {

        if (Object.keys(req.body).length == 0) {

            return res.status(400).send('Enter reply Info')
        }

        if (!req.body.text) {
            return res.status(400).send('Enter reply text')
        }

        const reply = await replyModel.create(req.body)

        req.comment.replies.push(reply._id)
        await req.comment.save()

        return res.status(201).send({ data: reply })

    } catch (error) {
        return res.status(500).send({ message: err.message })

    }
}

const updateReply = async (req, res) => {
    try {

    }
    catch (error) {
        return res.status(500).send({ message: err.message })
    }
}
const deleteReply = async (req, res) => {
    try {

    }
    catch (error) {
        return res.status(500).send({ message: err.message })
    }
}




module.exports = { createReply, updateReply, deleteReply }