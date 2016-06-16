require('materialize-loader');

import React from 'react'
import HoverInfo from '../containers/HoverInfo.jsx'
import SearchBar from '../containers/SearchBar.jsx'
import TwitterGraph from '../containers/TwitterGraph.jsx'
import RedditGraph from '../containers/RedditGraph.jsx'
import InitialGraph from '../containers/SentimentDistribuiton.jsx'

const App = () => (
  <div>
    <HoverInfo />
    <SearchBar />
    <InitialGraph />
  </div>
);

// <SearchBar />
// <TwitterGraph />
// <RedditGraph />

export default App