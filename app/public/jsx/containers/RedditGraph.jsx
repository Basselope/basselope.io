import React from 'react'
import { connect } from 'react-redux'

class RedditGraph extends React.Component {
  constructor(props) {
    super(props);
  }

  renderReddit(redditData) {
    console.log(RedditData);
  }

  render() {
    console.log('RedditGraph: ', this.props.reddit);
    return (
      <div>
        <div>RedditGraph</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { reddit: state.reddit };
}

export default connect(mapStateToProps)(RedditGraph)