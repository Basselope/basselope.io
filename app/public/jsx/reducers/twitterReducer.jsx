const initialState = { data: [] };

const postTwitter = (state = initialState, action) => {
  switch(action.type) {
    case 'POST_TWEETS': {
      return { ...state, data: action.payload };
    }
    default: {
      return state;
    }
  }
}

export default postTwitter