import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  
  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery || 'none'}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const dislikePost = (id) => API.patch(`/posts/${id}/dislikePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const comment = (value,id) => API.post(`/posts/${id}/commentPost`, { value });
export const deleteComment = (id,commentId) => API.delete(`posts/${id}/comment/${commentId}`);
export const updateComment = (id,commentId,value) => API.patch(`posts/${id}/comment/${commentId}`, {value});
export const fetchComments = (id) => API.get(`/posts/${id}/comments`);

export const addReply = (reply,id,commentId) => API.post(`/posts/${id}/comment/${commentId}/reply`, { reply });
export const fetchReplies = (id,commentId) => API.get(`/posts/${id}/comment/${commentId}/reply`);

export const createSubreddit = (subdata) => API.post(`/subreddits`,subdata);
export const getsubreddit = (sub) => API.get(`/subreddits/r/${sub}`);
export const getallsubreddits = () => API.get(`/subreddits`);
export const gettopsubreddits = () => API.get(`/subreddits/top10`);
export const subscribetosubreddit = (id) => API.post(`/subreddits/${id}/subscribe`);
export const getonesubredditid = (sub) => API.get(`/subreddits/giveMeId/${sub}`);
export const getsubredditusers = (sub) => API.get(`/subreddits/giveUsers/${sub}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);