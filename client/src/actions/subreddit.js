import * as api from '../api';

export const createSubreddit = (subData) => async (dispatch) => {
    try {
  
      const { data } = await api.createSubreddit(subData);
  
      dispatch({ type: 'CREATE_SUB', payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const getSubredditPosts = (sub) => async (dispatch) => {
  try {

    const { data } = await api.getsubreddit(sub);

    dispatch({ type: 'FETCH_SUB', payload: data });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getSubreddit = (sub) => async (dispatch) => {
  try {

    const { data } = await api.getsubreddit(sub);

    //dispatch({ type: 'FETCH_SUB_ONE', payload: data.subreddit });

    console.log("subreditid",data.subreddit._id)

    return data;
  } catch (error) {
    console.log(error);
  }
};



export const getAllSubreddits = () => async (dispatch) => {
  try {

    const { data } = await api.getallsubreddits();

    dispatch({ type: 'FETCH_ALL_SUBS', payload: data });

    return data;
  } catch (error) {
    console.log(error);
  }
};


export const getTopSubreddits = () => async (dispatch) => {
  try {

    const { data } = await api.gettopsubreddits();

    dispatch({ type: 'FETCH_SUB_10', payload: data });

  } catch (error) {
    console.log(error);
  }
};


export const subscribeToSubreddit = (id) => async (dispatch) => {
  try {

    await api.subscribetosubreddit(id);

  } catch (error) {
    console.log(error);
  }
};

export const getOneSubredditId = (sub) => async (dispatch) => {
  try {

    const { data } = await api.getonesubredditid(sub);

    return data;

  } catch (error) {
    console.log(error);
  }
};

export const getSubredditUsers = (sub) => async (dispatch) => {
  try {

    const { data } = await api.getsubredditusers(sub);

    return data;

  } catch (error) {
    console.log(error);
  }
};





