const initialState = { data: [] };

const postReddit = (state = initialState, action) => {
  switch(action.type) {
    case 'POST_REDDIT': {
      return { ...state, data: action.payload };
    }
    default: {
      return state;
    }
  }
}

export default postReddit