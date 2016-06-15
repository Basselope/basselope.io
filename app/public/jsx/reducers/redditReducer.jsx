import { FETCH_REDDIT } from '../actions/reddit.jsx'

const fetchReddit = (state = [], action) => {
  switch(action.type) {
    case FETCH_REDDIT: {
      return [action.payload, ...state ];
    }
    default: {
      return state;
    }
  }
}

export default fetchReddit