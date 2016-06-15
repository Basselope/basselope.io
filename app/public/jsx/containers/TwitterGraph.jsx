import React from 'react'
import { connect } from 'react-redux'

class TwitterGraph extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTwitter(twitterData) {
    console.log(twitterData);
  }

  render() {
    console.log('TwitterGraph: ', this.props.twitter.data);
    return (
      <div>
        <div>TwitterGraph</div>
          <div>{this.props.twitter.data.mean}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { twitter: state.twitter };
}

export default connect(mapStateToProps)(TwitterGraph)