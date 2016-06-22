import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App.jsx'
import SearchBar from './containers/SearchBar.jsx'

import Dashboard from './components/Dashboard.jsx'
import SentimentPlot from './containers/SentimentPlot.jsx'
// import TimePlot from './containers/TimePlot.jsx'
import Table from './containers/Table.jsx'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={SearchBar} />
    <Route component={Dashboard}>
      <Route path="/:term/sentimentplot" component={SentimentPlot} />
      {/*<Route path="/:term/timeplot" component={TimePlot} />*/}
      <Route path="/:term/table" component={Table} />
    </Route>
  </Route>
)