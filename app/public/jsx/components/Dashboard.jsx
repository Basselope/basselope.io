require('materialize-loader');

import React from 'react'
import Metrics from '../containers/Metrics.jsx'
import SentimentPlot from '../containers/SentimentPlot.jsx'
import NavBar from './NavBar.jsx'
import NewsList from '../containers/NewsList.jsx'

const Dashboard = (props) => (
  <div>
    <Metrics pathname={props.location.pathname} />
    {props.children}
    <NavBar baseURL={props.params.term} />
    <NewsList />
  </div>
)

export default Dashboard