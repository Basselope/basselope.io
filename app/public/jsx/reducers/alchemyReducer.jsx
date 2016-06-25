import { FETCH_ALCHEMY } from '../dispatch/alchemy.jsx'

const INITIAL_STATE = { data: [] }

const fetchAlchemy = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_ALCHEMY:
      return { ...state, data: action.payload.data };
    default:
      return state;
  }
}

export default fetchAlchemy