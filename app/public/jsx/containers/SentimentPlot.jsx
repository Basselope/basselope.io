import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// import { fetchReddit } from '../actions/reddit.jsx'
// import { fetchTwitter } from '../actions/twitter.jsx'
import HoverInfo from './HoverInfo.jsx'

import node from '../../d3/d3Plot.jsx'
import time from '../../d3/d3Time.jsx'

import rd3 from 'react-d3-library'


const RD3Component = rd3.Component;

class SentimentPlot extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="valign-wrapper" style={{
          position: 'fixed',
          zIndex: 0,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
          }}>
          <div className="valign container center-align" style={{
            left: 0,
            right: 0,
            overflow: 'visible',
            }}>
            <RD3Component data={this.props.d3} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state,props) => ({
    d3: node(state.twitter.data, state.reddit.data),
    d3Time:time(state.twitter.data, state.reddit.data),

    data: {twitter:state.twitter.data, reddit:state.reddit.data}
  });

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({ fetchTwitter, fetchReddit }, dispatch);
// };

export default connect(mapStateToProps)(SentimentPlot)