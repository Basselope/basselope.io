import { FETCH_REDDIT } from '../dispatch/reddit.jsx'
import { FETCH_TWITTER } from '../dispatch/twitter.jsx'


import d3Plot from '../views/d3/d3Plot.jsx'
import d3Time from '../views/d3/d3Time.jsx'

const INITIAL_STATE = { data: {twitter: null, reddit: null }, graph: { plot: null, time: null } };



const d3Reducer = (state = INITIAL_STATE, action) => {

  switch(action.type) {
    case FETCH_REDDIT:
      return { ...state,
        data: { ...state.data,
          reddit: action.payload.data
        },
        graph: !state.data.twitter ? {...state.graph} : {
          plot: state.graph.plot || d3Plot(state.data.twitter, action.payload.data),
          time: state.graph.plot || d3Time(state.data.twitter, action.payload.data)
        }
      };
    case FETCH_TWITTER:
      return { ...state,
        data: { ...state.data,
          twitter: action.payload.data
        },
        graph: !state.data.reddit ? {...state.graph} : {
          plot: state.graph.plot || d3Plot(action.payload.data, state.data.reddit),
          time: state.graph.time || d3Time(action.payload.data, state.data.reddit)
        }
      };
    default:
      return state;
  }

};

export default d3Reducer