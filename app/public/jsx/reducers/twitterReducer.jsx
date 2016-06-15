import { FETCH_TWITTER } from '../actions/twitter.jsx'

const INITIAL_STATE = { data: {} }

const fetchTwitter = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_TWITTER: {
      return { ...state, data: action.payload.data };
    }
    default: {
      return state;
    }
  }
}

export default fetchTwitter