import React from 'react'
import SearchBar from '../containers/SearchBar.jsx'
import TwitterGraph from '../containers/TwitterGraph.jsx'
import RedditGraph from '../containers/RedditGraph.jsx'
import InitialGraph from '../containers/InitialGraph.jsx'

const App = () => (
  <div>
    <SearchBar />
    <TwitterGraph />
    <RedditGraph />
    <InitialGraph />
  </div>
)

export default App