import { FETCH_WIKIPEDIA } from '../actions/api/wikipedia.jsx'

const INITIAL_STATE = { data: {} }

const wikiReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_WIKIPEDIA:
      return { ...state, data: action.payload.data };
    default:
      return state;
  }
}

export default wikiReducer