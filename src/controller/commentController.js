const commentModel = require('../models/commentModel')
const replyModel = require('../models/replyModel')

// create a comment for a post
const createComment = async (req, res) => {
    try {
        const { text, author } = req.body

        if (!text) {
            return res.status(400).send('Enter Text')
        }
        if (!author) {
            return res.status(400).send('Author Name is Missing')
        }

        const comment = await commentModel.create(req.body)

        req.post.comments.push(comment)
        await req.post.save()

        return res.status(201).send({ message: " Created Successfully", data: comment })

    } catch (err) {
        return res.status(400).send({ message: err.message })
    }
}


// get all comments for a post
const getAllComments = async (req, res) => {
    try {

        const comments = await commentModel.find({ _id: { $in: req.post.comments } }).populate('replies')
        return res.status(201).send({ data: comments })

    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

// get a single comment for a post
const getSingleComment = async (req, res) => {

    try {
        return res.status(400).send({ data: req.comment })

    } catch (err) {
        return res.status(400).send({ message: err.message })
    }
}

// update a comment for a post
const updateComment = async (req, res) => {
    try {

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send('Enter text In Comment')
        }
        if (req.body.text != null) {
            req.comment.text = req.body.text
        }

        const updatedComment = await req.comment.save()
        return res.status(400).send({ data: updatedComment })

    } catch (err) {
        return res.status(400).send({ message: "Update Successfully", message: err.message })
    }
}

// delete a comment for a post
const deleteComment = async (req, res) => {
    try {
        const comment = req.comment

        await Promise.all(
            comment.replies.map(async (reply_id) => {
                await replyModel.findByIdAndDelete(reply_id);
            })
        )
        await req.comment.remove()

        req.post.comments = req.post.comments.filter(comment => comment !== req.params.commentId) //pull() method
        await req.post.save()

        return res.status(400).send({ message: 'Comment deleted' })

    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

module.exports = { createComment, getAllComments, getSingleComment, updateComment, deleteComment }

