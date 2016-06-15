import React from 'react'
import SearchBar from '../containers/searchBar.jsx'
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