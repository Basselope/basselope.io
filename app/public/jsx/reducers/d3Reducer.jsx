import { FETCH_REDDIT } from '../actions/reddit.jsx'
import { FETCH_TWITTER } from '../actions/twitter.jsx'
const ACTIONS = { FETCH_REDDIT, FETCH_TWITTER };

import d3Plot from '../../d3/d3Plot.jsx'
import d3Time from '../../d3/d3Time.jsx'

const INITIAL_STATE = {
  d3: { plot: null, time: null },
  reddit: { data: {} },
  twitter: { data: {} }
};



const d3Render = (state = INITIAL_STATE, action) => {
  if(!ACTIONS.hasOwnProperty(action.type))
    return state;
  return { ...state,
    d3: {
      plot: d3Plot(state.twitter.data, state.reddit.data),
      time: d3Time(state.twitter.data, state.reddit.data)
    }
  };
};

export default d3Render