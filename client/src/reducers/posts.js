export default (state = { posts: [] }, action) => {
    switch (action.type) {
      case 'FETCH_ALL':
        return {
          ...state,
          posts: action.payload.data,
          currentPage: action.payload.currentPage,
          numberOfPages: action.payload.numberOfPages,
        };
      case 'LOAD_MORE_POSTS':
        return {
            ...state,
            posts: [...state.posts, ...action.payload.data],
            currentPage: action.payload.currentPage,
            numberOfPages: action.payload.numberOfPages,
        };
      case 'FETCH_BY_SEARCH':
        return { ...state, posts: action.payload };
      case 'FETCH_POST':
        return { ...state, post: action.payload.post };
      case 'LIKE':
        return { ...state,post:action.payload, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
      case 'DISLIKE':
        return { ...state,post:action.payload, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case 'CREATE':
        return { ...state, posts: [...state.posts, action.payload] };
      case 'UPDATE':
        return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
      case 'DELETE':
        return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
      case 'CREATE_COMMENT_POST':
        return { ...state,
          comments: [...state.comments, action.payload]};
      case 'DELETE_COMMENT_POST':
        return {
          ...state,
          comments: state.comments.filter((c) => c._id !== action.payload)
        };
      case 'FETCH_COMMENTS':
        return { ...state,
          comments: action.payload};
      default:
        return state;
    }
  };

 