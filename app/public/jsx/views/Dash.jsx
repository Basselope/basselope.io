require('materialize-loader');

import React from 'react'


import Metrics from './components/dashboard/Metrics.jsx'
import Nav from './components/dashboard/NavBar.jsx'



const Dashboard = (props) => (
  <div>
    <Metrics path={props.route.path} />

    {props.children}
    <Nav baseURL={props.params.term} />

  </div>
);

export default Dashboard

