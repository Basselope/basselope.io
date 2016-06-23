import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App.jsx'
import SearchBar from './containers/SearchBar.jsx'


import Dashboard from './components/Dashboard.jsx'


import SentimentPlot from './containers/SentimentPlot.jsx'
import TimeLine from './containers/TimeLine.jsx'
import Table from './containers/Table.jsx'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={SearchBar} />
    <Route path=":term" component={Dashboard}>
      <Route path="tone-plot" component={SentimentPlot} />
      <Route path="timeline" component={TimeLine} />
      <Route path="table" component={Table} />
    </Route>
  </Route>
)