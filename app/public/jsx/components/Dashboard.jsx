require('materialize-loader');

import React from 'react'
import { connect } from 'react-redux'

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
);

// const mapStateToProps = (state,props) => ({
//   d3: props.d3 && (props.d3.plot && props.d3.time) ? props.d3 : {
//     plot: d3Plot(state.twitter.data, state.reddit.data),
//     time: d3Time(state.twitter.data, state.reddit.data)
//   }
// });
//
// export default connect(mapStateToProps)(Dashboard);

export default Dashboard

