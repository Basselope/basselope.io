import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from '../views/Main.jsx'
import SearchBar from '../views/containers/SearchBar.jsx'

import Dashboard from '../views/Dashboard.jsx'
import DashView from '../views/containers/DashView.jsx'
import Table from '../views/containers/Table.jsx'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={SearchBar} />
    <Route path=":term" component={Dashboard}>
      <Route path="plot" component={DashView} />
      <Route path="time" component={DashView} />
      <Route path="pie" component={DashView} />
    </Route>
  </Route>
)