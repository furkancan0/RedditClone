import express from "express";

import { getPostsBySearch,getPosts,getPost, createPost, updatePost, deletePost, likePost,
    commentPost,deleteComment,updateComment,dislikePost,getComments,postReply,getReplies } from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

//posts routes
router.get('/search', getPostsBySearch);
router.get('/:id', getPost);
router.get('/', getPosts);
router.post('/',auth, createPost);
router.patch('/:id',auth, updatePost)
router.delete('/:id',auth, deletePost);
router.patch('/:id/likePost',auth, likePost);
router.patch('/:id/dislikePost',auth, dislikePost);

//comments routes
router.get('/:id/comments', getComments);
router.post('/:id/commentPost',auth, commentPost);
router.delete('/:id/comment/:commentId',auth, deleteComment);
router.patch('/:id/comment/:commentId', auth, updateComment);

//reply routes
router.post('/:id/comment/:commentId/reply', auth, postReply);
router.get('/:id/comment/:commentId/reply', getReplies);

export default router;