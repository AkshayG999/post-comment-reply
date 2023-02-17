const express = require('express')
const router = express.Router()

const { createPost, getPost, singlePost, updatePost, deletePost } = require('../controller/postController')
const { createComment, getAllComments, getSingleComment, updateComment, deleteComment, } = require('../controller/commentController')
const { createReply, updateReply, deleteReply } = require('../controller/replyController')
const { commentMid, postMid } = require('../middleware/middle')

router.post('/posts', createPost)
router.get('/posts', getPost)
router.get('/posts/:post_id', postMid, singlePost) //single
router.patch('/posts/:post_id', postMid, updatePost)
router.delete('/posts/:post_id', postMid, deletePost)

 //Comment
router.post('/posts/:post_id/comments', postMid, createComment)
router.get('/posts/:post_id/comments', postMid, getAllComments)
router.get('/posts/:post_id/comments/:commentId', postMid, commentMid, getSingleComment) //single
router.patch('/posts/:post_id/comments/:commentId', postMid, commentMid, updateComment)
router.delete('/posts/:post_id/comments/:commentId', postMid, commentMid, deleteComment)

//Reply
router.post('/posts/:post_id/comments/:commentId/reply', postMid, commentMid, createReply) //Reply Create for comment
router.patch('/posts/:post_id/comments/:commentId/reply', postMid, commentMid, updateReply)
router.delete('/posts/:post_id/comments/:commentId/reply', postMid, commentMid, deleteReply)

module.exports = router