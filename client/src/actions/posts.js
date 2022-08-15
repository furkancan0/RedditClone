import * as api from '../api';

export const getPost = (id) => async (dispatch) => {
  try {

    const { data } = await api.fetchPost(id);

    dispatch({ type: 'FETCH_POST', payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = () => async (dispatch) => {
    try {
        const {  data: { data, currentPage, numberOfPages } } = await api.fetchPosts(1);

        dispatch({ type: 'FETCH_ALL', payload: { data, currentPage, numberOfPages } });

    } catch (error) {
        console.log(error)
    }
}




export const loadMorePosts  = (page) => async (dispatch) => {
  try {
      const {  data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);


      dispatch({ type: 'LOAD_MORE_POSTS', payload: { data, currentPage, numberOfPages } });


  } catch (error) {
      console.log(error)
  }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: 'FETCH_BY_SEARCH', payload: data});

  } catch (error) {
    console.log(error);
  }
}

export const createPost = (post,navigate) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: 'CREATE', payload: data});

        navigate('/',{ replace: true });

    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: 'UPDATE', payload: data});

    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
      const { data } = await api.likePost(id);
  
      dispatch({ type: 'LIKE', payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

export const dislikePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.dislikePost(id);

    dispatch({ type: 'DISLIKE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value,id);

    dispatch({ type: 'CREATE_COMMENT_POST', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteComment = (id, commentId) => async (dispatch) => {
  try {
    const { data } = await api.deleteComment(id,commentId);

    dispatch({ type: 'DELETE_COMMENT_POST', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateComment = (id, commentId, value) => async (dispatch) => {
  try {
    const { data } = await api.updateComment(id,commentId,value);

    //dispatch({ type: 'DELETE_COMMENT_POST', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getComments = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchComments(id);

    dispatch({ type: 'FETCH_COMMENTS', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
    try {
      await api.deletePost(id);
  
      dispatch({ type: 'DELETE', payload: id });
    } catch (error) {
      console.log(error.message);
    }
  };


  export const addReply = (value,id,commentId) => async (dispatch) => {
    try {
      const { data } = await api.addReply(value,id, commentId);

      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  export const getReplies = (id,commentId) => async (dispatch) => {
    try {
      const { data } = await api.fetchReplies(id, commentId);

      return data;
  
    } catch (error) {
      console.log(error.message);
    }
  };

