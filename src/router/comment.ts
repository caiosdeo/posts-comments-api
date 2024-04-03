import express from 'express';

import { newComment, listAllComments, deleteComment, getComment } from '../controllers/comment';

export default(router: express.Router) => {
    router.post('/posts/:postId/comments', newComment);
    router.get('/posts/:postId/comments', listAllComments);
    router.get('/posts/:postId/comments/:commentId', getComment);
    router.delete('/posts/:postId/comments/:commentId', deleteComment);
}