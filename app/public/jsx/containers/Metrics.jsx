
 import React from 'react'
require('materialize-loader');
class Metrics extends React.Component {

  constructor(props) {
    super(props);
    //this.state = {data: {twitter: null, reddit:null}}
  }

  cardBuilder(content, title){
    if(this.checkTruthCondition(this) ){
    return (<div>
              <div>
                <div className="col s12 m3" >
                  <div className="card z-depth-2 blue-grey darken-1">
                    <div className="card-content">
                      <span className="card-title ">{content()}</span>
                      <p style={{"textTransform": "uppercase"}}>{title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>);
    }
  }

  checkTruthCondition(passedThis){
    return passedThis.props.data.twitter && passedThis.props.data.twitter.hasOwnProperty('mean') && passedThis.props.data.reddit && passedThis.props.data.reddit.hasOwnProperty('mean') 
  }

  renderMean(){
    console.log(this.props);
    if(this.checkTruthCondition(this) ){
      let twitterMean = this.props.data.twitter.metricMean;
      let redditMean = this.props.data.reddit.metricMean;
      let twitterSum = this.props.data.twitter.set.length;
      let redditSum = this.props.data.reddit.set.length;
      let totalMean = (((twitterMean*twitterSum)+(redditMean*redditSum))/(redditSum+twitterSum)).toFixed(1) + "%";
      return (<span className="card-title ">{totalMean}</span>)
    }
  }
  
  renderPosPercent(){
    if(this.checkTruthCondition(this) ){
      let twitterPercentPos = this.props.data.twitter.percentPositive;
      let redditPercentPos = this.props.data.reddit.percentPositive;
      let twitterSum = this.props.data.twitter.set.length;
      let redditSum = this.props.data.reddit.set.length;
      let totalPercent = ((twitterPercentPos*twitterSum)+(redditPercentPos*redditSum))/(redditSum+twitterSum);
      let percentFixed = ((totalPercent) * 100).toFixed(1) + "%"
      return (<span className="card-title ">{percentFixed}</span>)
    }
  }
  
  renderNegPercent(){
    if(this.checkTruthCondition(this) ){
      let twitterPercentNeg = this.props.data.twitter.percentNegative;
      let redditPercentNeg = this.props.data.reddit.percentNegative;
      let twitterSum = this.props.data.twitter.set.length;
      let redditSum = this.props.data.reddit.set.length;
      let totalPercent = ((twitterPercentNeg*twitterSum)+(redditPercentNeg*redditSum))/(redditSum+twitterSum);
      let percentFixed = ((totalPercent) * 100).toFixed(1) + "%"
      return (<span className="card-title ">{percentFixed}</span>)
    }
  }
  
  renderTotal(){
    if(this.checkTruthCondition(this) ){
      let totalSize = this.props.data.twitter.set.length+this.props.data.reddit.set.length
      return (<span className="card-title ">{totalSize}</span>)
    }
  }

  render() {
    return (
      <div className = "row center-align blue-grey-text text-lighten-4">
        {this.cardBuilder(this.renderMean.bind(this), "Average Sentiment")}
        {this.cardBuilder(this.renderNegPercent.bind(this), "Negative %")}
        {this.cardBuilder(this.renderPosPercent.bind(this), "Postive %")}
        {this.cardBuilder(this.renderTotal.bind(this), "Total")}
      </div>

    );
  }
}

export default Metrics