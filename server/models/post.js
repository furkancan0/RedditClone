import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
    repliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    replyBody: {
      type: String,
      trim: true,
    },
    createdAt: { type: Date, default: Date.now },
  });

const commentSchema = mongoose.Schema({
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    commentPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    commentBody: {
      type: String,
      trim: true,
    },
    replies: [replySchema],
    upvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    downvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    createdAt: { type: Date, default: Date.now },
  });
  
const postSchema = mongoose.Schema({
    title: String,
    body: {
        type:String,required:true
    },
    selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    comments: [commentSchema],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    upvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    downvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    subreddit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subreddit',
    },
})

export default mongoose.model('Post', postSchema);

