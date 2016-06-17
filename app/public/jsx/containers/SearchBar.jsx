require('materialize-loader');

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'

import { fetchBing } from '../actions/bing.jsx'
import { fetchReddit } from '../actions/reddit.jsx'
import { fetchTwitter } from '../actions/twitter.jsx'
import BingList from './BingList.jsx'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.bingListClick = this.bingListClick.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
    this.props.fetchBing(event.target.value);
  }

  onFormSubmit(event) {
    event.preventDefault();

    this.props.fetchReddit(this.state.term);
    this.props.fetchTwitter(this.state.term);
    this.setState({ term: '' });

    const path = `/${this.state.term}`;
    browserHistory.push(path);
  }

  bingListClick(suggestion) {
    this.setState({term: suggestion});
  }

  render() {
    return (
      <div style={{position: 'fixed', marginTop: '90px', left: 0, right: 0}} className="v-align-wrapper">
        <form onSubmit={this.onFormSubmit} className="container">
          <div className="input-field v-align">
            <div className="row">
              <div className="col s8 offset-s2 m6 offset-m3">
                <input type='text' value={this.state.term} onChange={this.onInputChange} />
                <BingList term={this.state.term} bingListClick={this.bingListClick} />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchBing, fetchReddit, fetchTwitter }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar)