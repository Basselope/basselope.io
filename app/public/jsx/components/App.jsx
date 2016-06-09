import React from 'react'
import SearchBar from './searchBar.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };
  }

  render() {
    return (
      <div>
        <SearchBar />
      </div>
    );
  }
}

export default App