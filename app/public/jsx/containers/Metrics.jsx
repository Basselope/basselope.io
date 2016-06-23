import React from 'react'
import { connect } from 'react-redux'
import { Navbar, Row, Col, Chip } from 'react-materialize'

import SearchBar from './SearchBar.jsx'

class Metrics extends React.Component {
  constructor(props) {
    super(props);
  }

  checkTruthCondition() {
    return this.props.twitter.data.hasOwnProperty('mean') && this.props.reddit.data.hasOwnProperty('mean');
  }

  renderMean(){
    console.log(this.props);
    if (this.checkTruthCondition()) {
      let twitterMean = this.props.twitter.data.metricMean;
      let redditMean = this.props.reddit.data.metricMean;
      let twitterSum = this.props.twitter.data.set.length;
      let redditSum = this.props.reddit.data.set.length;
      let totalMean = (((twitterMean*twitterSum)+(redditMean*redditSum))/(redditSum+twitterSum)).toFixed(1);
      let displayMean = `${totalMean > 0 ? '+' : ''}${totalMean}%`;
      return displayMean;
    }
  }

   renderNegPercent() {
    if (this.checkTruthCondition()) {
      const twitterPercentNeg = this.props.twitter.data.percentNegative;
      const redditPercentNeg = this.props.reddit.data.percentNegative;
      const twitterSum = this.props.twitter.data.set.length;
      const redditSum = this.props.reddit.data.set.length;
      const totalPercent = ((twitterPercentNeg*twitterSum)+(redditPercentNeg*redditSum))/(redditSum+twitterSum);
      const percentFixed = ((totalPercent) * 100).toFixed(1);
      return percentFixed;
    }
  }

  renderNeutralPercent() {
    return (100 - this.renderPosPercent() - this.renderNegPercent()).toFixed(1);
  }

  renderPosPercent() {
    if (this.checkTruthCondition()) {
      const twitterPercentPos = this.props.twitter.data.percentPositive;
      const redditPercentPos = this.props.reddit.data.percentPositive;
      const twitterSum = this.props.twitter.data.set.length;
      const redditSum = this.props.reddit.data.set.length;
      const totalPercent = ((twitterPercentPos * twitterSum) + (redditPercentPos * redditSum)) / (redditSum + twitterSum);
      const percentFixed = ((totalPercent) * 100).toFixed(1);
      return percentFixed;
    }
  }

  renderTotal() {
    if (this.checkTruthCondition()) {
      const totalSize = this.props.twitter.data.set.length + this.props.reddit.data.set.length;
      return totalSize;
    }
  }

  chipBuilder(title, stats) {
    if (this.checkTruthCondition()) {
      return (
        <Col>
          <Chip>
            {title}{stats}
          </Chip>
        </Col>
      );
    }
  }

  render() {
    return (
      <Navbar className='blue-grey lighten-2'>
        <Row>
          {this.chipBuilder("Weighted Sentiment: ", this.renderMean())}
          {this.chipBuilder("Negative: ", `${this.renderNegPercent()}%`)}
          {this.chipBuilder("Neutral: ", `${this.renderNeutralPercent()}%`)}
          {this.chipBuilder("Positive: ", `${this.renderPosPercent()}%`)}
          {this.chipBuilder("Sample Size: ", this.renderTotal())}
        </Row>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return { reddit: state.reddit, twitter: state.twitter };
}

export default connect(mapStateToProps)(Metrics)