import { FETCH_REDDIT } from '../actions/api/reddit.jsx'
import { FETCH_TWITTER } from '../actions/api/twitter.jsx'
import { RESET_STATE } from '../actions/resetState.jsx'


import d3Plot from '../views/d3/d3Plot.jsx'
import d3Time from '../views/d3/d3Time.jsx'
import d3Pie from '../views/d3/d3Pie.jsx'

const INITIAL_STATE = { data: { twitter: null, reddit: null }, graph: { plot: null, time: null, pie: null } };


const d3Reducer = (state = INITIAL_STATE, action) => {

  switch(action.type) {
    case RESET_STATE:
      return { ...INITIAL_STATE };
    case FETCH_REDDIT:
      return { ...state,
        data: { ...state.data,
          reddit: action.payload.data
        },
        graph: !state.data.twitter ? {...state.graph} : {
          pie: state.graph.pie || d3Pie(state.data.twitter, action.payload.data),
          plot: state.graph.plot || d3Plot(state.data.twitter, action.payload.data),
          time: state.graph.time || d3Time(state.data.twitter, action.payload.data)
        }
      };
    case FETCH_TWITTER:
      return { ...state,
        data: { ...state.data,
          twitter: action.payload.data
        },
        graph: !state.data.reddit ? {...state.graph} : {
          pie: state.graph.pie || d3Pie(action.payload.data, state.data.reddit),
          plot: state.graph.plot || d3Plot(action.payload.data, state.data.reddit),
          time: state.graph.time || d3Time(action.payload.data, state.data.reddit)
        }
      };
    default:
      return state;
  }

};

export default d3Reducer