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
    axios.post('/_api/reddit/search', { "query": value}).then(function(res) {
        console.log("REDDITTTTTT",res);
      });
    axios.post('/_api/twitter/search', { "query": value, count:100 })
      .then(function(res) {
        console.log(res);
      });
  }
  commitSearchCriteria(value){
    this.setState({autosuggest: []})
    this.setState({ term: value})
    this.searchBarAction(value);

  }
    searchBarSuggestion(input) {
      this.setState({ term: input})
      var self = this;
      input = input.trim().split(" ").join("%20");

      axios.post('/_api/bing/suggestions', { "query": input })
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
        <input id='input' type='text' value={this.state.term} onChange={event => this.searchBarSuggestion(event.target.value)} />
        <button type='submit' id='searchButton' onClick={() => this.searchBarAction(this.state.term)}>Submit</button>
        <div > 
        <ProperyList list={this.state.autosuggest} commitSearchCriteria ={this.commitSearchCriteria.bind(this) } /></div>
      </div>
    );
  }
}




// Search.propTypes = {
//   value: PropTypes.string.isRequired
// }

export default SearchBar