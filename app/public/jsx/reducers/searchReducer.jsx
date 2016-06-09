const INITIAL_STATE = { items: '' };

const searchReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'SEARCH': {
      return { ...state, items: action.url.data};
    }
    default: {
      return state;
    }
  }
}

export default searchReducer