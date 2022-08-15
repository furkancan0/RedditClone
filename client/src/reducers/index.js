import { combineReducers } from "redux";

import posts from './posts';
import auth from './auth';
import subreddit from './subreddit';

export default combineReducers({
    posts:posts,
    auth:auth,
    subreddit:subreddit,
});