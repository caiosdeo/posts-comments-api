import express from 'express';

import { validateValue, validateExistingComment, validateExistingPost, logError } from '../helpers';
import { countComments, createComment, deleteCommentById, getCommentById, getComments } from '../db/comment';
import { addComment, removeComment } from '../db/post';

export const newComment = async (req: express.Request, res: express.Response) => {
    try{

        const { postId } = req.params;
        const { content } = req.body;
        const method = "COMMENT_CREATE";
        
        try {
            validateValue(postId, "post id", method);
            validateValue(content, "content", method);
            await validateExistingPost(postId, method);
        } catch (error) {
            logError(error.message);
            return res.status(error.code).json({ error });
        }

        const comment = await createComment({
            content,
            post: postId
        })

        await addComment(postId, comment._id.toString());

        return res.status(200).json({ "message": "Comment created!", comment});

    } catch (error) {
        logError(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const listAllComments = async (req: express.Request, res: express.Response) => {
    try{

        const { postId } = req.params;
        const method = "COMMENT_LIST";

        const pageNumber: number = parseInt(req.query.pageNumber as string) || 1; 
        const pageSize: number = parseInt(req.query.pageSize as string) || 10; 
        
        try {
            validateValue(postId, "post id", method);
            await validateExistingPost(postId, method);
        } catch (error) {
            logError(error.message);
            return res.status(error.code).json({ error });
        }

        const totalCount = await countComments(); 
        const totalPages = Math.ceil(totalCount / pageSize);
        const skip = (pageNumber - 1) * pageSize;

        const comments = await getComments(postId, skip, pageSize);

        return res.status(200).json({comments, totalPages});
    } catch (error) {
        logError(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteComment = async (req: express.Request, res: express.Response) => {
    try{

        const { postId, commentId } = req.params;
        const method = "COMMENT_DELETE";

        try {
            validateValue(commentId, "comment id", method);
            validateValue(postId, "post id", method);
            await validateExistingComment(commentId, method);
            await validateExistingPost(postId, method);
        } catch (error) {
            logError(error.message);
            return res.status(error.code).json({ error });
        }

        await deleteCommentById(commentId);
        
        await removeComment(postId, commentId);

        return res.status(200).json({"message": "Comment deleted!" });
    } catch (error) {
        logError(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getComment = async (req: express.Request, res: express.Response) => {
    try{

        const { postId, commentId } = req.params;
        const method = "COMMENT_GET";

        try {
            validateValue(postId, "post id", method);
            validateValue(commentId, "comment id", method);
            await validateExistingPost(postId, method);
            await validateExistingComment(commentId, method);
        } catch (error) {
            logError(error.message);
            return res.status(error.code).json({ error });
        }

        const comment = await getCommentById(commentId);

        return res.status(200).json(comment);
    } catch (error) {
        logError(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}