import { FETCH_BING } from '../dispatch/bing.jsx'

const INITIAL_STATE = { data: [] }

const fetchBing = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_BING:
      return { ...state, data: action.payload.data[1].slice(0, 7) };
    default:
      return state;
  }
}

export default fetchBing