import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    content: { type: String, required: true},
    date: { type: Date, default: Date.now },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
});

export const CommentModel = mongoose.model('Comment', CommentSchema);

export const getComments = (postId: string, skip: number, pageSize: number) => CommentModel.find({ post: postId }).skip(skip).limit(pageSize);
export const getCommentById = (id: string) => CommentModel.findById(id);

export const createComment = (values: Record<string, any>) => new CommentModel(values).save().then((comment) => comment.toObject());

export const deleteComments = (ids: string[]) => CommentModel.deleteMany({_id: { $in: ids } });
export const deleteCommentById = (id: string) => CommentModel.findOneAndDelete({_id: id });

export const countComments = () => CommentModel.countDocuments();
