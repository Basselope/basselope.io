import React, { PropTypes } from 'react'

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleSearch(e) {
    this.setState({value: e.target.value});
  }

  handleKeyPress(e) {
    if(e.key === 'Enter') {
      document.getElementById('searchButton').click();
    }
  }

  render() {
    return (
      <div>
        <input id='input' type='text' value={this.state.value} onChange={this.handleSearch} onKeyPress={this.handleKeyPress}></input>
        <button id='searchButton' onClick={this.props.searchRequest}>Submit</button>
      </div>
    );
  }
}

// Search.propTypes = {
//   value: PropTypes.string.isRequired
// }

export default Search