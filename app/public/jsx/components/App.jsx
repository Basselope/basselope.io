import React from 'react'
import SearchBar from '../containers/SearchBar.jsx'
import TwitterGraph from '../containers/TwitterGraph.jsx'
import RedditGraph from '../containers/RedditGraph.jsx'

const App = () => (
  <div>
    <SearchBar />
    <TwitterGraph />
    <RedditGraph />
  </div>
)

export default App