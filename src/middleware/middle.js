const postModel = require('../models/postModel');
const Comment = require('../models/commentModel');
const { isValidObjectId } = require('mongoose');



// middleware function to get a single post
const postMid = async (req, res, next) => {
    try {
        
        if (!req.params.post_id) {
            return res.status(400).send({ message: "Invalid Request" })
        }
        if (!isValidObjectId(req.params.post_id)) {
            return res.status(400).send({ message: "Invalid Post_id" })
        }
        const post = await postModel.findById(req.params.post_id)
            .populate('comments')
            .populate({
                path: 'comments',
                populate: {
                    path: 'replies',
                    model: 'Reply'
                }
            });

        if (post == null) {
            return res.status(404).send({ message: "Post not found" })
        }
        req.post = post
        next()

    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

// middleware function to get a single comment for a post
const commentMid = async (req, res, next) => {
    try {
        if (!req.params.commentId) {
            return res.status(400).send({ message: "Invalid commentId Request" })
        }
        if (!isValidObjectId(req.params.commentId)) {
            return res.status(400).send({ message: "Invalid commentId" })
        }

        const comment = await Comment.findById(req.params.commentId).populate('replies')

        if (comment == null) {
            return res.status(404).send({ message: "Comment not found" })
        }
        req.comment = comment
        next()

    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}
module.exports = { commentMid, postMid }