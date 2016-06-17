import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App.jsx'
import SearchBar from './containers/SearchBar.jsx'
// import HoverInfo from './containers/HoverInfo.jsx'
import InitialGraph from './containers/SentimentDistribution.jsx'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={SearchBar} />
    <Route path="/:term" component={InitialGraph} />
  </Route>
)