import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from '../views/Main.jsx'
//import SearchBar from '../views/containers/SearchBar.jsx'
import Home from '../views/components/Home.jsx'

import Dashboard from '../views/Dash.jsx'
import DashView from '../views/containers/DashView.jsx'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path=":term" component={Dashboard}>
      <Route path=":view" component={DashView} />
    </Route>
  </Route>
)