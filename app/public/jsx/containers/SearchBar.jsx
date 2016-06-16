
require('materialize-loader');

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchBing } from '../actions/bing.jsx'
import { fetchReddit } from '../actions/reddit.jsx'
import { fetchTwitter } from '../actions/twitter.jsx'

import List from '../components/List.jsx'


class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSuggestionSelect = this.onSuggestionSelect.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
    this.props.fetchBing(event.target.value);
  }

  onSuggestionSelect(val) {
    this.setState({term: val});
  }

  onFormSubmit(event) {
    event.preventDefault();

    this.props.fetchReddit(this.state.term);
    this.props.fetchTwitter(this.state.term);
    this.setState({term: ''})
  }

  render() {
    // console.log(this.props);
    return (
      <div className="v-align-wrapper container" style={{height: '100vh'}}>
        <form>

          <div className="input-field v-align">
            <div className="row">
              <div className="col s8 offset-s2 m6 offset-m3">
                <input style={{marginTop: '33vh'}} type='text' value={this.props.term}
                  onChange={this.onInputChange} />
                <List hideOnSelect={true} list={this.props.suggestions || []}
                  selectEvent={this.onSuggestionSelect} />
              </div>
            </div>
          </div>

        </form>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    suggestions: state.bing.suggestions
  }
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchBing, fetchReddit, fetchTwitter }, dispatch);
};



export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)