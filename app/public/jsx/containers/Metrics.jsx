import React from 'react'
import { connect } from 'react-redux'

class Metrics extends React.Component {
  constructor(props) {
    super(props);
  }

  checkTruthCondition() {
    return this.props.twitter.data.hasOwnProperty('mean') && this.props.reddit.data.hasOwnProperty('mean');
  }

  renderMean() {
    if(this.checkTruthCondition()) {
      const twitterMean = this.props.twitter.data.metricMean;
      const redditMean = this.props.reddit.data.metricMean;
      const twitterSum = this.props.twitter.data.set.length;
      const redditSum = this.props.reddit.data.set.length;
      const totalMean = (((twitterMean*twitterSum)+(redditMean*redditSum))/(redditSum+twitterSum)).toFixed(1) + "%";
      return <span className="card-title">{totalMean}</span>;
    }
  }

  renderPosPercent() {
    if(this.checkTruthCondition()) {
      const twitterPercentPos = this.props.twitter.data.percentPositive;
      const redditPercentPos = this.props.reddit.data.percentPositive;
      const twitterSum = this.props.twitter.data.set.length;
      const redditSum = this.props.reddit.data.set.length;
      const totalPercent = ((twitterPercentPos*twitterSum)+(redditPercentPos*redditSum))/(redditSum+twitterSum);
      const percentFixed = ((totalPercent) * 100).toFixed(1) + "%";
      return <span className="card-title">{percentFixed}</span>;
    }
  }

  renderNegPercent() {
    if(this.checkTruthCondition()) {
      const twitterPercentNeg = this.props.twitter.data.percentNegative;
      const redditPercentNeg = this.props.reddit.data.percentNegative;
      const twitterSum = this.props.twitter.data.set.length;
      const redditSum = this.props.reddit.data.set.length;
      const totalPercent = ((twitterPercentNeg*twitterSum)+(redditPercentNeg*redditSum))/(redditSum+twitterSum);
      const percentFixed = ((totalPercent) * 100).toFixed(1) + "%";
      return <span className="card-title">{percentFixed}</span>;
    }
  }

  renderTotal() {
    if(this.checkTruthCondition()) {
      const totalSize = this.props.twitter.data.set.length + this.props.reddit.data.set.length;
      return <span className="card-title">{totalSize}</span>;
    }
  }

  cardBuilder(content, title) {
    if(this.checkTruthCondition()) {
      return (
        <div className="col s12 m3" >
          <div className="card z-depth-2 blue-grey darken-1">
            <div className="card-content">
              <span className="card-title ">{content}</span>
              <p style={{"textTransform": "uppercase"}}>{title}</p>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className = "row center-align blue-grey-text text-lighten-4">
        {this.cardBuilder(this.renderMean(), "Average Sentiment")}
        {this.cardBuilder(this.renderPosPercent(), "Negative %")}
        {this.cardBuilder(this.renderNegPercent(), "Postive %")}
        {this.cardBuilder(this.renderTotal(), "Total")}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { reddit: state.reddit, twitter: state.twitter };
}

export default connect(mapStateToProps)(Metrics)