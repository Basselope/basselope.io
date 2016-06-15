import { combineReducers } from 'redux'
import redditReducer from './redditReducer.jsx'
import twitterReducer from './twitterReducer.jsx'

const rootReducer = combineReducers({
  reddit: redditReducer,
  twitter: twitterReducer
});

export default rootReducer
