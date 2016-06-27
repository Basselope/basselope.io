// import { combineReducers } from 'redux'
import bingReducer from './bingReducer.jsx'
import redditReducer from './redditReducer.jsx'
import twitterReducer from './twitterReducer.jsx'
import wikiReducer from './wikiReducer.jsx'

import alchemyReducer from './alchemyReducer.jsx'

import d3Reducer from './d3Reducer.jsx'


const rootReducer = {
  bing: bingReducer,
  reddit: redditReducer,
  twitter: twitterReducer,
  alchemy: alchemyReducer,
  d3: d3Reducer,
  wiki: wikiReducer
};

export default rootReducer
