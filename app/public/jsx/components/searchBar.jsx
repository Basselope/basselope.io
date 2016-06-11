import React, { PropTypes } from 'react'
import axios from 'axios'

import ProperyList from './propertyList.jsx'
class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { term: '', autosuggest:[] };
  }

  searchBarAction(value) {
    value = value.trim().split(" ").join("%20");
    axios.post('/_api/twitter/search', { "query": value })
      .then(function(res) {
        console.log(res);
      });
  }
    searchBarSuggestion(input, value) {
      this.setState({ term: input})
      var self = this;
      value = value.trim().split(" ").join("%20");
      axios.post('/_api/bing/suggestions', { "query": value })
      .then(function(res) {
        console.log(res);
        let content = []
        for(var key in res.data[1]) {
          content.push(res.data[1][key]);
        }
        self.setState({autosuggest: content})
      });
  }

  render() {
    return (
      <div>
        <input id='input' type='text' value={this.state.term} onChange={event => this.searchBarSuggestion(event.target.value, this.state.term)} />
        <button type='submit' id='searchButton' onClick={() => this.searchBarAction(this.state.term)}>Submit</button>
        <div onClick={() => this.searchBarSuggestion(this.state.term)} > 
        <ProperyList list={this.state.autosuggest} /></div>
      </div>
    );
  }
}




// Search.propTypes = {
//   value: PropTypes.string.isRequired
// }

export default SearchBar