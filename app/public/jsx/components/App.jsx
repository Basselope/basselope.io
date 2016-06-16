import React from 'react'
import SearchBar from '../containers/SearchBar.jsx'
import TwitterGraph from '../containers/TwitterGraph.jsx'
import RedditGraph from '../containers/RedditGraph.jsx'
import InitialGraph from '../containers/InitialGraph.jsx'
import HoverInfo from '../containers/HoverInfo.jsx'

const App = () => (
  <div>
  	  <HoverInfo />
    <SearchBar />
    <TwitterGraph />
    <RedditGraph />
    <InitialGraph />
  
  </div>
)

export default App