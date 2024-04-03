import express from 'express';

import { logError, validateValue, validateEmptyValue, validateExistingPost } from '../helpers';
import { countPosts, createPost, deletePostById, getPostById, getPostByTitle, getPosts, updatePostById } from '../db/post'
import { countComments, deleteComments, getComments } from '../db/comment';

export const newPost = async (req: express.Request, res: express.Response) => {
    try{

        const { title, author, content } = req.body;
        const method = "POST_CREATE";

        try {
            validateValue(title, "title", method);
            validateValue(author, "author", method);
            validateValue(content, "content", method);
        } catch (error) {
            logError(error.message);
            return res.status(error.code).json({ error });
        }

        const existingPost = await getPostByTitle(title);

        if (existingPost) {
            const error = {
                "error": {
                    "code": 400,
                    "message": "This title has already been used!"
                }
            }
            logError(`[${method}]: This title has already been used!`);
            return res.status(400).json(error);
        }

        const post = await createPost({
            title,
            author,
            content
        })

        return res.status(200).json({ "message": "Post created!", post});

    } catch (error) {
        logError(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const listAllPosts = async (req: express.Request, res: express.Response) => {
    try{
        const pageNumber: number = parseInt(req.query.pageNumber as string) || 1; 
        const pageSize: number = parseInt(req.query.pageSize as string) || 10; 

        const totalCount = await countPosts(); 
        const totalPages = Math.ceil(totalCount / pageSize);
        const skip = (pageNumber - 1) * pageSize;

        const posts = await getPosts(skip, pageSize);

        return res.status(200).json({ posts, totalPages });
    } catch (error) {
        logError(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updatePost = async (req: express.Request, res: express.Response) => {
    try{
        const { postId } = req.params;
        const { title, author, content } = req.body;

        const method = "POST_UPDATE";

        try {
            validateValue(postId, "post id", method);
            await validateExistingPost(postId, method);
            validateEmptyValue(title, method, "Title");
            validateEmptyValue(author, method, "Author");
            validateEmptyValue(content, method, "Content");
        } catch (error) {
            logError(error.message);
            return res.status(error.code).json({ error });
        }

        const post = await updatePostById(postId, { title, author, content });

        return res.status(200).json(post);
    } catch (error) {
        logError(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deletePost = async (req: express.Request, res: express.Response) => {
    try{
        const { postId } = req.params;
        const method = "POST_DELETE";

        try {
            validateValue(postId, "post id", method);
            await validateExistingPost(postId, method);
        } catch (error) {
            logError(error.message);
            return res.status(error.code).json({ error });
        }

        const totalComments = await countComments(); 
        const comments = await getComments(postId, 0, totalComments);
        const commentsIds = comments.map((comment) => comment._id.toString());

        await deleteComments(commentsIds);

        await deletePostById(postId);

        return res.status(200).json({ message: "Post deleted!" });
    } catch (error) {
        logError(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getPost = async (req: express.Request, res: express.Response) => {
    try{
        const { postId } = req.params;
        const method = "POST_GET";

        try {
            validateValue(postId, "post id", method);
            await validateExistingPost(postId, method);
        } catch (error) {
            logError(error.message);
            return res.status(error.code).json({ error });
        }

        const post = await getPostById(postId);

        return res.status(200).json(post);
    } catch (error) {
        logError(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}