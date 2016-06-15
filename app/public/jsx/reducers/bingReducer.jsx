import { FETCH_BING } from '../actions/bing.jsx'

const INITIAL_STATE = { term: '', suggestions: [] }

const fetchBing = (state = INITIAL_STATE, action) => {
  console.log(state,action);
  switch(action.type) {
    case FETCH_BING:
      return { ...state, suggestions: action.payload.data[1].splice(0,7) };
    default:
      return state;
  }
};

export default fetchBing