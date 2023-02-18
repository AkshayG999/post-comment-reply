const postModel = require('../models/postModel')
const commentModel = require('../models/commentModel')
const replyModel = require('../models/replyModel')

// create a post
const createPost = async (req, res) => {
    try {
        if (Object.keys(req.body).length == 0) {
            res.status(401).send('Please Provide Some Info In Post')
        }
        const { title, content } = req.body

        if (!title) {
            return res.status(400).send('Enter Title')
        }
        if (!content) {
            return res.status(400).send('Enter Post Content')
        }

        const post = await postModel.create(req.body)
        return res.status(201).send({ message: "Post Created Successfully", data: post })

    } catch (err) {
        return res.status(400).send({ message: err.message })
    }
}


// get all posts
const getPost = async (req, res) => {
    try {

        const posts = await postModel.find()
            .populate('comments')
            .populate({
                path: 'comments',
                populate: {
                    path: 'replies',
                    model: 'Reply'
                }
            })
        return res.status(200).send({ data: posts })

    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

// get a single post
const singlePost = async (req, res) => {
    try {

        return res.status(200).send({ data: req.post })

    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

// update a post
const updatePost = async (req, res) => {
    try {

        if (Object.values(req.body).length == 0) {
            return res.status(400).send('Please Fill data')
        }
        const { title, content } = req.body
        
        if (title == '' && content == '') {
            return res.status(400).send({message:'Please Fill data'})
        }

        if (title !== '') {
            req.post.title = req.body.title
        }
        if (content !== '') {
            req.post.content = req.body.content
        }
        const updatedPost = await req.post.save()
        return res.status(200).send({ message: "Post Update Successfully", data: updatedPost })

    } catch (err) {
        return res.status(400).send({ message: err.message })
    }
}

// delete a post
const deletePost = async (req, res) => {
    try {

        const comments = req.post.comments

        await Promise.all(
            comments.map(async (comment_id) => {
                const comment = await commentModel.findById(comment_id)

                if (comment) {
                    await Promise.all(
                        comment.replies.map(async (reply_id) => {
                            await replyModel.findByIdAndDelete(reply_id);
                        })
                    )
                    await commentModel.findByIdAndDelete(comment_id);
                }
            })
        )

        await postModel.findByIdAndDelete(req.params.post_id)

        return res.status(200).send({ message: 'Post deleted' })

    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}



module.exports = { createPost, getPost, singlePost, updatePost, deletePost }
