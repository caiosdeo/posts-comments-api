import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true},
    author: { type: String, required: true},
    content: { type: String, required: true},
    date: { type: Date, default: Date.now },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

export const PostModel = mongoose.model('Post', PostSchema);

export const getPosts = (skip: number, pageSize: number) => PostModel.find().skip(skip).limit(pageSize).populate('comments');

export const getPostById = (id: string) => PostModel.findById(id).populate('comments');
export const getPostByTitle = (title: string) => PostModel.findOne({ title });

export const createPost = (values: Record<string, any>) => new PostModel(values).save().then((post) => post.toObject());

export const deletePostById = (id: string) => PostModel.findOneAndDelete({_id: id }).populate('comments');

export const updatePostById = (id: string, values: Record<string, any>) => PostModel.findByIdAndUpdate(id, values, { new: true }).populate('comments');

export const addComment = (id: string, commentId: string) => PostModel.findByIdAndUpdate(id, { $push: { comments: commentId } }, { new: true });
export const removeComment = (id: string, commentId: string) => PostModel.findByIdAndUpdate(id, { $pull: { comments: commentId } }, { new: true });

export const countPosts = () => PostModel.countDocuments();