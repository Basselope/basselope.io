require('materialize-loader');

import React from 'react'
import SearchBar from '../containers/SearchBar.jsx'
import TwitterGraph from '../containers/TwitterGraph.jsx'
import RedditGraph from '../containers/RedditGraph.jsx'
import InitialGraph from '../containers/InitialGraph.jsx'
import HoverInfo from '../containers/HoverInfo.jsx'
import Metrics from '../containers/Metrics.jsx'

const App = () => (
  <div>
    <HoverInfo />

const App = () => (
  <div>
  	  <HoverInfo />
  	  <Metrics />
    <SearchBar />
    <InitialGraph />
  </div>
);

// <SearchBar />
// <TwitterGraph />
// <RedditGraph />

export default App