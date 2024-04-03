import { getPostById } from '../db/post';
import { getCommentById } from '../db/comment';

interface CustomError extends Error {
    code?: number;
}

export const logError = (error: string) => {
    const date = new Date();
    console.log(formatDateTime(date), error);
}

function formatDateTime(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

export const validateExistingComment = async (commentId: string, method: string) => {
    const existingComment = await getCommentById(commentId);
    if (!existingComment) {
        logError(`[${method}]: Comment does not exist!`);
        const error: CustomError = new Error();
        error.code = 404;
        error.message = "This comment does not exist!";
        throw error;
    }
};

export const validateExistingPost = async (postId: string, method: string) => {
    const existingPost = await getPostById(postId);
    if (!existingPost) {
        logError(`[${method}]: Post does not exist! Dentro do validate`);
        const error: CustomError = new Error();
        error.code = 404;
        error.message = "This post does not exist!";
        throw error;
    }
};

export const validateValue = (value: string, valueType: string, method: string) => {
    if (!value) {
        logError(`[${method}]: Missing ${valueType}!`);
        const error: CustomError = new Error();
        error.code = 400;
        error.message = `Missing ${valueType}!`;
        throw error;
    }
};

export const validateEmptyValue = (value: string, method: string, valueType: string) => {
    if (value === "") {
        logError(`[${method}]: Empty ${valueType}!`);
        const error: CustomError = new Error();
        error.code = 400;
        error.message = `${valueType} cannot be empty!`;
        throw error;
    }
}

