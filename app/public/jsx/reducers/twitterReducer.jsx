import { FETCH_TWITTER } from '../actions/twitter.jsx'
import node from '../../d3/d3Dist.js'
const INITIAL_STATE = { data: {}, d3: {} }

const fetchTwitter = (state = INITIAL_STATE, action) => {
  console.log(action);
  switch(action.type) {
    case FETCH_TWITTER:
      return { ...state, d3: node, data: action.payload.data };
    default:
      return state;
  }
};

export default fetchTwitter