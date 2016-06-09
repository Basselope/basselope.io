import React, { PropTypes } from 'react'
import axios from 'axios'

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { term: '' };
  }

  searchBarAction(value) {
    axios.post('/_api/twitter/search', { "query": value })
      .then(function(res) {
        console.log(res);
      });
  }

  render() {
    return (
      <div>
        <input id='input' type='text' value={this.state.term} onChange={event => this.setState({ term: event.target.value })} />
        <button type='submit' id='searchButton' onClick={() => this.searchBarAction(this.state.term)}>Submit</button>
      </div>
    );
  }
}

// Search.propTypes = {
//   value: PropTypes.string.isRequired
// }

export default SearchBar