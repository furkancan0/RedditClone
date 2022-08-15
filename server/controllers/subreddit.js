import Post from '../models/post.js';
import User from '../models/user.js';
import Subreddit from '../models/subreddit.js';


export const createNewSubreddit = async (req, res) => {
    const { subredditName, description } = req.body;
  
    const admin = await User.findById(req.userId);
    if (!admin) {
      return res
        .status(404)
        .send({ message: 'User does not exist in database.' });
    }
  
    const existingSubName = await Subreddit.findOne({
      subredditName: { $regex: new RegExp('^' + subredditName + '$', 'i') },
    });
  
    if (existingSubName) {
      return res.status(403).send({
        message: `Subreddit having same name "${subredditName}" already exists. Choose another name.`,
      });
    }
  
    const newSubreddit = new Subreddit({
      subredditName,
      description,
      admin: admin._id,
      subscribedBy: [admin._id],
      subscriberCount: 1,
    });
  
    const savedSubreddit = await newSubreddit.save();
  
    admin.subscribedSubs = admin.subscribedSubs.concat(savedSubreddit._id);
    await admin.save();
  
    return res.status(201).json(savedSubreddit);
  };

  export const getSubredditPosts = async (req, res) => {
    const { subredditName } = req.params;
  
    const subreddit = await Subreddit.findOne({
      subredditName: { $regex: new RegExp('^' + subredditName + '$', 'i') },
    }).populate('admin', 'username');
  
    if (!subreddit) {
      return res.status(404).send({
        message: `Subreddit '${subredditName}' does not exist on server.`,
      });
    }
  
    const subredditPosts = await Post.find({ subreddit: subreddit.id })
      .sort('-createdAt')
      .select('-comments')
      .populate('author','username');
  
    res.status(200).json({ subreddit: subreddit, posts: subredditPosts });
  };

  export const getAllSubreddits = async (req, res) => {

    const subreddit = await Subreddit.find();

    return res.status(201).json({subreddit: subreddit});
  };

  export const getTopSubreddits = async (req, res) => {
    const top10Subreddits = await Subreddit.find({})
      .sort({ subscriberCount: -1 })
      .limit(10)
      .select('-description -posts -admin -subscribedBy ');
  
    res.status(200).json(top10Subreddits);
  };


  export const subscribeToSubreddit = async (req, res) => {
    const { id } = req.params;
  
    const subreddit = await Subreddit.findById(id);
    const user = await User.findById(req.userId);
  
    if (subreddit.subscribedBy.includes(user._id.toString())) {
      subreddit.subscribedBy = subreddit.subscribedBy.filter(
        (s) => s.toString() !== user._id.toString()
      );
  
      user.subscribedSubs = user.subscribedSubs.filter(
        (s) => s.toString() !== subreddit._id.toString()
      );
    } else {
      subreddit.subscribedBy = subreddit.subscribedBy.concat(user._id);
  
      user.subscribedSubs = user.subscribedSubs.concat(subreddit._id);
    }
  
    subreddit.subscriberCount = subreddit.subscribedBy.length;
  
    await subreddit.save();
    await user.save();
  
    res.status(201).end();
  };


export const getSubrId = async (req, res) => {
  const { subredditName } = req.params;

  const subreddit = await Subreddit.findOne({
    subredditName: { $regex: new RegExp('^' + subredditName + '$', 'i') },
  }).select('-description -posts -admin -subscribedBy -subscriberCount ');

  if (!subreddit) {
    return res.status(404).send({
      message: `Subreddit '${subredditName}' does not exist on server.`,
    });
  }
  return res.status(201).json(subreddit);
}

export const getSubrUsers = async (req, res) => {
  const { subredditName } = req.params;

  const subreddit = await Subreddit.findOne({
    subredditName: { $regex: new RegExp('^' + subredditName + '$', 'i') },
  }).select('-description -posts -admin -subscriberCount ');

  if (!subreddit) {
    return res.status(404).send({
      message: `Subreddit '${subredditName}' does not exist on server.`,
    });
  }

  return res.status(201).json(subreddit);
}