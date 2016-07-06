import { FETCH_TWITTER } from '../actions/api/twitter.jsx'

const INITIAL_STATE = { data: {} }

const twitterReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_TWITTER:
      return { ...state, data: action.payload.data };
    default:
      return state;
  }
}

export default twitterReducer