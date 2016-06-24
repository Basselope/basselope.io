import { combineReducers } from 'redux'
import bingReducer from './bingReducer.jsx'
import redditReducer from './redditReducer.jsx'
import twitterReducer from './twitterReducer.jsx'
import alchemyReducer from './alchemyReducer.jsx'

const rootReducer = combineReducers({
  bing: bingReducer,
  reddit: redditReducer,
  twitter: twitterReducer,
  alchemy: alchemyReducer
});

export default rootReducer
