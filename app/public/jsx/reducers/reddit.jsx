const initialState = { comments: [] };

const reddit = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_REDDIT': {
      return { ...state, comments: action.url.body };
    }
    default: {
      return state;
    }
  }
}

export default reddit