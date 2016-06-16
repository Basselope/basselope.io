require('materialize-loader');

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchBing } from '../actions/bing.jsx'
import { fetchReddit } from '../actions/reddit.jsx'
import { fetchTwitter } from '../actions/twitter.jsx'
import BingList from './BingList.jsx'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { term: '', showBingList: false };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.bingListClick = this.bingListClick.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value, showBingList: true });
    this.props.fetchBing(event.target.value);
  }

  onFormSubmit(event) {
    event.preventDefault();

    this.props.fetchReddit(this.state.term);
    this.props.fetchTwitter(this.state.term);
    this.setState({ term: '', showBingList: false });
  }

  bingListClick(suggestion) {
    this.setState({term: suggestion});
  }

  render() {
    return (
      <div className="v-align-wrapper container" style={{height: '100vh'}}>
        <form onSubmit={this.onFormSubmit}>

          <div className="input-field v-align">
            <div className="row">
              <div className="col s8 offset-s2 m6 offset-m3">
                <input style={{marginTop: '33vh'}} type='text' value={this.state.term} onChange={this.onInputChange} />
                <BingList showBingList={this.state.showBingList} bingListClick={this.bingListClick} />
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