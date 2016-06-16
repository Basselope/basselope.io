import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// import { fetchReddit } from '../actions/reddit.jsx'
import { fetchTwitter } from '../actions/twitter.jsx'

// import node from '../../d3/sentimentDistribution.js'
import rd3 from 'react-d3-library'

const RD3Component = rd3.Component;

class SentimentDistribution extends React.Component {

  constructor(props) {
    super(props);
    this.props.fetchTwitter('nodejs');
  }

  // componentDidMount() {
  //  
  // }

  render() {
    // console.log(node)
    return (
      <div className="container">
        <div className="center-align" style={{left: 0, right: 0, overflow: 'hidden', zIndex: -1}}>
          <RD3Component data={this.props.d3} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state,props) => {
  return {
    data: state.twitter.data,
    d3: state.twitter.d3
    // sd: state.twitter.data.standard_deviation
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchTwitter }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SentimentDistribution)

//export default SentimentDistribution