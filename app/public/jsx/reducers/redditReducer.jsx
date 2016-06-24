import { FETCH_REDDIT } from '../actions/reddit.jsx'

const INITIAL_STATE = { data: {} }

const redditReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_REDDIT:
      return { ...state, data: action.payload.data };
    default:
      return state;
  }
}

export default redditReducer