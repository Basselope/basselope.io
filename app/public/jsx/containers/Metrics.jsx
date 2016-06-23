import React from 'react'

import { connect } from 'react-redux'

class Metrics extends React.Component {
  constructor(props) {
    super(props);
  }

  checkTruthCondition() {
    return this.props.twitter.data.hasOwnProperty('mean') && this.props.reddit.data.hasOwnProperty('mean');
  }
  cardBuilder(content, title) {
    if (this.checkTruthCondition(this)) {
      return (<div>
        <div>
          <div className="col s12 m3">
            <div className="card z-depth-2 blue-grey darken-1">
              <div className="card-content">
                <span className="card-title">{content}</span>
                <p style={{"textTransform": "uppercase"}}>{title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>);
    }
  }

  renderPosPercent() {
    if (this.checkTruthCondition()) {
      const twitterPercentPos = this.props.twitter.data.percentPositive;
      const redditPercentPos = this.props.reddit.data.percentPositive;
      const twitterSum = this.props.twitter.data.set.length;
      const redditSum = this.props.reddit.data.set.length;
      const totalPercent = ((twitterPercentPos * twitterSum) + (redditPercentPos * redditSum)) / (redditSum + twitterSum);
      const percentFixed = ((totalPercent) * 100).toFixed(1) + "%";
      return <span className="card-title">{percentFixed}</span>;
    }
  }

  renderMean(){
    console.log(this.props);
    if(this.checkTruthCondition(this) ){
      let twitterMean = this.props.twitter.data.metricMean;
      let redditMean = this.props.reddit.data.metricMean;
      let twitterSum = this.props.twitter.data.set.length;
      let redditSum = this.props.reddit.data.set.length;
      let totalMean = (((twitterMean*twitterSum)+(redditMean*redditSum))/
        (redditSum+twitterSum)).toFixed(1);
      let displayMean = `${totalMean > 0 ? '+' : ''}${totalMean}%`;
      return (<span className="card-title ">{displayMean}</span>)
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
        {this.cardBuilder(this.renderMean(), "average")}
        {this.cardBuilder(this.renderNegPercent(), "negative")}
        {this.cardBuilder(this.renderPosPercent(), "positive")}
        {this.cardBuilder(this.renderTotal(), "samples")}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { reddit: state.reddit, twitter: state.twitter };
}

export default connect(mapStateToProps)(Metrics)