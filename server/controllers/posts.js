import Post from '../models/post.js'
import User from '../models/user.js';
import Subreddit from '../models/subreddit.js';

export const getPosts = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

        const total = await Post.countDocuments({});
        const posts = await Post.find().sort({ _id: -1 }).select('-comments').limit(LIMIT).skip(startIndex).populate([{path:'author',select:'username'},
        {path:'subreddit',select:'subredditName'}]);

        res.json({ data: posts, numberOfPosts:total});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        const populatedPost = await post
        .populate([{path:'comments.commentedBy',select:'username'},{path:'author',select:'username'},
        {path:'comments.replies.repliedBy',select:'username'},
        {path:'subreddit',select:'subredditName'}]);

        res.status(200).json(populatedPost);
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery} = req.query;
    try {
        const title = new RegExp(searchQuery, 'i'); //Test TEST test => test

        const posts = await Post.find({ title });

        res.json(posts);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

export const createPost = async (req, res) => {
    const post = req.body;

    const {subreddit} = req.body;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    const targetSubreddit = await Subreddit.findById(subreddit);

    if (!targetSubreddit) {
      return res.status(404).send({
        message: `Subreddit with ID: '${subreddit}' does not exist in database.`,
      });
    }

    const isSubbed = targetSubreddit.subscribedBy.find((u) => u._id.toString() === req.userId)

    if (!isSubbed) {
      return res.status(404).send({
        message: `User with ID: '${req.userId}' does not subbed.`,
      });
    }

    targetSubreddit.posts = targetSubreddit.posts.concat(post._id);

    const newPost = new Post({ ...post, author: req.userId, createdAt: new Date().toISOString() })
    
    try {
        await newPost.save();

        const populatedPost = await newPost
            .populate([{path:'author',select:'username'},{path:'subreddit',select:'subredditName'}]);
        res.status(201).json(populatedPost);

    } catch (error) {
        res.status(409).json({message: error.message});
    }

};

export const updatePost = async (req, res) => {
    const { id } = req.params;

    const post = await Post.findById(id);

    await post.updateOne({ $set: req.body });

    const updatedPost = await Post.findById(id);
    
    res.json(updatedPost);
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!post) {
        return res.status(404).send({
          message: `Post with ID: ${id} does not exist in database.`,
        });
    }

    const isLiked = post.upvotedBy.includes(req.userId.toString());

    if (!isLiked) {
        await post.updateOne({ $push: { upvotedBy: req.userId } });//like
        await post.updateOne({ $pull: { downvotedBy: req.userId } });
    }else{
        await post.updateOne({ $pull: { upvotedBy: req.userId } });//undo like
    }

    const updatedPost = await Post.findById(id);
    
    res.json(updatedPost);
}

export const dislikePost = async (req, res) => {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!post) {
        return res.status(404).send({
          message: `Post with ID: ${id} does not exist in database.`,
        });
    }


    const isUnLiked = post.downvotedBy.includes(req.userId.toString());

    if (!isUnLiked) {
        await post.updateOne({ $push: { downvotedBy: req.userId } });//unlike
        await post.updateOne({ $pull: { upvotedBy: req.userId } });
    }else{
        await post.updateOne({ $pull: { downvotedBy: req.userId } });//undo unlike
    }

    const updatedPost = await Post.findById(id);
    
    res.json(updatedPost);
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;
  
    if (!value) {
      return res.status(400).send({ message: `Comment body can't be empty.` });
    }
  
    const post = await Post.findById(id);
    const user = await User.findById(req.userId);
  
    if (!post) {
      return res.status(404).send({
        message: `Post with ID: ${id} does not exist in database.`,
      });
    }
  
    if (!user) {
      return res
        .status(404)
        .send({ message: 'User does not exist in database.' });
    }
  
    post.comments = post.comments.concat({
      commentedBy: user._id,
      commentBody: value,
    });

    const savedPost = await post.save();
    const populatedPost = await savedPost
      .populate([{path:'comments.commentedBy',select:'username'}]);

    const addedComment = populatedPost.comments[savedPost.comments.length - 1];
    res.status(201).json(addedComment);
}



export const getComments = async (req, res) => {
    const { id} = req.params;

    const post = await Post.findById(id);

    if (!post) {
        return res.status(404).send({
          message: `Post with ID: ${id} does not exist in database.`,
        });
      }
    
      const populatedPost = await post
      .populate([{path:'comments.commentedBy',select:'username'},{path:'comments.replies.repliedBy',select:'username'}]);

        const addedComment = populatedPost.comments;
        res.status(201).json(addedComment);  
}

export const updateComment = async (req, res) => {
    const { id, commentId } = req.params;
    const { value } = req.body;

    const post = await Post.findById(id);
    const user = await User.findById(req.userId);

    if (!post) {
        return res.status(404).send({
          message: `Post with ID: ${id} does not exist in database.`,
        });
      }
    
    if (!user) {
    return res
        .status(404)
        .send({ message: 'User does not exist in database.' });
    }

    const targetComment = post.comments.find((c) => c._id.toString() === commentId)

    if (!targetComment) {
        return res.status(404).send({
          message: `Comment with ID: '${commentId}'  does not exist in database.`,
        });
      }

    if (targetComment.commentedBy.toString() !== user._id.toString()) {
        return res.status(401).send({ message: 'Access is denied.' });
    }

    targetComment.commentBody = value;
    post.comments = post.comments.map((c)=> c._id.toString() !== commentId ? c : targetComment)

    await post.save();
    res.status(201).json({ message: "Comment updated successfully." });

}


export const deletePost = async (req, res) => {
    const { id } = req.params;

    const post = Post.findById(id);

    if(post.author.toString() !== req.userId){
      return res.status(404).send({
        message: `Post with ID: ${id} is not yours.`,
      });
    }

    await Post.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const deleteComment = async (req, res) => {
    const { id, commentId } = req.params;

    const post = await Post.findById(id);
    
    post.comments = post.comments.filter((c) => c._id.toString() !== commentId);

    await post.save();
    res.json(commentId);

}

export const postReply = async (req, res) => {
    const { id, commentId } = req.params;
    const { reply } = req.body;
  
    if (!reply) {
      return res.status(400).send({ message: `Reply body can't be empty.` });
    }
  
    const post = await Post.findById(id);
    const user = await User.findById(req.userId);
  
    if (!post) {
      return res.status(404).send({
        message: `Post with ID: ${id} does not exist in database.`,
      });
    }
  
    if (!user) {
      return res
        .status(404)
        .send({ message: 'User does not exist in database.' });
    }
  
    const targetComment = post.comments.find((c) => c._id.toString() === commentId);
  
    if (!targetComment) {
      return res.status(404).send({
        message: `Comment with ID: '${commentId}'  does not exist in database.`,
      });
    }
  
    targetComment.replies = targetComment.replies.concat({
      replyBody: reply,
      repliedBy: user._id,
    });
  
    post.comments = post.comments.map((c) =>c._id.toString() !== commentId ? c : targetComment);

    const savedPost = await post.save();
    const populatedPost = await savedPost
        .populate([{path:'comments.replies.repliedBy',select:'username'}]);
  
    const commentToReply = populatedPost.comments.find((c) => c._id.toString() === commentId);
  
    const addedReply = commentToReply.replies[commentToReply.replies.length - 1];
    res.status(201).json(addedReply);
  };

  
  export const getReplies = async (req, res) => {
    const { id, commentId } = req.params;
 
    const post = await Post.findById(id);
 
    const populatedPost = await post
        .populate([{path:'comments.replies.repliedBy',select:'username'}]);
  
    const commentToReply = populatedPost.comments.find((c) => c._id.toString() === commentId);
  
    const aCommentReplies = commentToReply.replies
    res.status(201).json(aCommentReplies);
  };
  

 
 
