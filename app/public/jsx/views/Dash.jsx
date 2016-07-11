require('materialize-loader');

import React from 'react'

import HomeLink from './components/dashboard/HomeLink.jsx'
import Metrics from './components/dashboard/Metrics.jsx'
import Nav from './components/dashboard/NavBar.jsx'


const Dashboard = (props) => (
  <div>
    <HomeLink />
    <Metrics params={props.params} />
    {props.children}
    <Nav baseURL={props.params.term} />
  </div>
);

export default Dashboard

