import express from 'express';

import { newPost, deletePost, listAllPosts, updatePost, getPost } from '../controllers/post';

export default(router: express.Router) => {
    router.post('/posts', newPost);
    router.get('/posts', listAllPosts);
    router.get('/posts/:postId', getPost);
    router.delete('/posts/:postId', deletePost);
    router.patch('/posts/:postId', updatePost);
}           