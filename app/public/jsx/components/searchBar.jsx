import React, { PropTypes } from 'react'
import twitter from '../actions/twitter.jsx'

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { term: '' };
  }

  render() {
    return (
      <div>
        <input id='input' type='text' value={this.state.term} onChange={event => this.setState({ term: event.target.value })} />
        <button type='submit' id='searchButton' onClick={() => twitter(this.state.term)}>Submit</button>
      </div>
    );
  }
}

// Search.propTypes = {
//   value: PropTypes.string.isRequired
// }

export default SearchBar