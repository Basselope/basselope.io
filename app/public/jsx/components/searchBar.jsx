import React, { PropTypes } from 'react'
import axios from 'axios'
require('materialize-loader');

import List from './propertyList.jsx'
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { term: '', autosuggest:[],  showSuggestion:{display:"none"}};
  }

  searchBarAction(value) {
    value = value.trim().split(" ").join("%20");
    axios.post('/_api/reddit/search', { "query": value})
      .then(function(res) {
        console.log("REDDITTTTTT",res);
      });
    axios.post('/_api/twitter/search', { "query": value })
      .then(function(res) {
        console.log(res);
      });
  }
  commitSearchCriteria(value){
    this.setState({autosuggest: []});
    this.setState({ term: value});
    this.searchBarAction(value);
  }
  searchBarSuggestion(input) {
    this.setState({ term: input});
    if(input.length==0){
      this.setState({autosuggest: []});
      return;
    }else{

    var self = this;
    input = input.trim().split(" ").join("%20");

    axios.post('/_api/bing/suggestions', { "query": input })
    .then(function(res) {
      console.log(res);
      let content = [];
      for(var key in res.data[1]) {
        content.push(res.data[1][key]);
      }
      self.setState({autosuggest: content.slice(0,7)})
    });
    }
  }
  //<input type='submit' id='searchButton' onClick={() => this.searchBarAction(this.state.term)}>Submit</input>

  render() {
    return (
      <div className="v-align-wrapper container" style={{height: '100vh'}}>
        <div className="input-field v-align">
          <div className="row">
            <div className="col s8 offset-s2 m6 offset-m3">
            <input style={{marginTop: '33vh'}} type='text' value={this.state.term}
                   onChange={event => this.searchBarSuggestion(event.target.value)} />
            <List hideOnSelect={true} list={this.state.autosuggest}
                  selectEvent={this.commitSearchCriteria.bind(this) } />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Search.propTypes = {
//   value: PropTypes.string.isRequired
// }

export default SearchBar