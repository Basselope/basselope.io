require('materialize-loader');

import React from 'react'
import Metrics from '../containers/Metrics.jsx'
import SentimentPlot from '../containers/SentimentPlot.jsx'
// import NavBar from './components/NavBar.jsx'


const Dashboard = (props) => (
  <div>
    {/*<Metrics />*/}
    <SentimentPlot />
    {/*<NavBar />*/}
  </div>
)

export default Dashboard