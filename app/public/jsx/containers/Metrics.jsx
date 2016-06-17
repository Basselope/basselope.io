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
                    <p>{title}</p>
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
      let twitterMean = this.props.data.twitter.mean;
      let redditMean = this.props.data.reddit.mean;
      let twitterSum = this.props.data.twitter.setSize;
      let redditSum = this.props.data.reddit.setSize;
      let totalMean = (((twitterMean*twitterSum)+(redditMean*redditSum))/(redditSum+twitterSum)).toFixed(1) + "%";
      return (<span className="card-title ">{totalMean}</span>)
    }
  }
  
  renderPosPercent(){
    console.log(this.props);
    if(this.checkTruthCondition(this) ){
      let twitterPercentPos = this.props.data.twitter.percentPositive;
      let redditPercentPos = this.props.data.reddit.percentPositive;
      let twitterSum = this.props.data.twitter.setSize;
      let redditSum = this.props.data.reddit.setSize;
      let totalPercent = ((twitterPercentPos*twitterSum)+(redditPercentPos*redditSum))/(redditSum+twitterSum);
      let percentFixed = ((totalPercent) * 100).toFixed(1) + "%"
      return (<span className="card-title ">{percentFixed}</span>)
    }
  }
  
  renderNegPercent(){
    console.log(this.props);
    if(this.checkTruthCondition(this) ){
      let percentFixed = Math.floor((this.props.data.twitter.percentNegative) * 100).toFixed(1) + "%"
      return (<span className="card-title ">{percentFixed}</span>)
    }
  }
  
  renderTotal(){
    console.log(this.props);
    if(this.checkTruthCondition(this) ){
      let totalSize = this.props.data.twitter.setSize+this.props.data.reddit.setSize
      return (<span className="card-title ">{this.props.data.twitter.setSize}</span>)
    }
  }

  render() {
    // console.log(node)
    
    return (
      
      <div className = "row center-align blue-grey-text text-lighten-4">
          {this.cardBuilder(this.renderMean.bind(this), "Average Sentiment")}
          {this.cardBuilder(this.renderPosPercent.bind(this), "Postive %")}
          {this.cardBuilder(this.renderNegPercent.bind(this), "Negative %")}
          {this.cardBuilder(this.renderTotal.bind(this), "Total")}
          
      </div>

    );
  }
}
// const mapStateToProps = (state) => {
//   return { twitter: state.bing };
// }


export default Metrics