export default (state = { subreddits: [] }, action) => {
    switch (action.type) {
      case 'CREATE_SUB':
        return {
          ...state,
          subreddits: [...state.subreddits,action.payload],
        };
      case 'FETCH_SUB':
        return {
          ...state,
          subredditposts:action.payload,
        };
      case 'FETCH_SUB_10':
      return {
        subreddit: action.payload,
      };
      default:
        return state;
    }
  };

 