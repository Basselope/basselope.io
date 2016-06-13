import { combineReducers } from 'redux'
import tweets from './tweets.jsx'

const searchBarReducer = combineReducers({
  tweets
})

export default searchBarReducer