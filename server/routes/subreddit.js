import express from "express";
import auth from "../middleware/auth.js";
const router = express.Router();

import { createNewSubreddit,getAllSubreddits,getSubredditPosts,getTopSubreddits,subscribeToSubreddit,getSubrId,getSubrUsers } from "../controllers/subreddit.js";

router.post('/',auth,createNewSubreddit)
router.get('/r/:subredditName', getSubredditPosts);
router.get('/r', getAllSubreddits);
router.get('/top10', getTopSubreddits);
router.get('/giveMeId/:subredditName', auth,getSubrId);
router.get('/giveUsers/:subredditName',auth, getSubrUsers);
router.post('/:id/subscribe', auth, subscribeToSubreddit);


export default router;