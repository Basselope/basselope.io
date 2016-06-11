const initialState = { tweets: [] };

const tweets = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_TWEETS': {
      return { ...state, tweets: action.url.body };
    }
    default: {
      return state;
    }
  }
}

export default tweets