import React from 'react'
require('materialize-loader');
class Metrics extends React.Component {

  constructor(props) {
    super(props);
    //this.state = {data: {twitter: null, reddit:null}}
  }

  renderMean(){
    console.log(this.props);
    if(this.props.data.twitter && this.props.data.twitter.hasOwnProperty('mean'))
      return (<span className="card-title ">{this.props.data.twitter.mean}</span>)
  }
    renderPosPercent(){
    console.log(this.props);
    if(this.props.data.twitter && this.props.data.twitter.hasOwnProperty('mean'))
      return (<span className="card-title ">{this.props.data.twitter.mean}</span>)
  }
    renderNegPercent(){
    console.log(this.props);
    if(this.props.data.twitter && this.props.data.twitter.hasOwnProperty('mean'))
      return (<span className="card-title ">{this.props.data.twitter.mean}</span>)
  }
    renderTotal(){
    console.log(this.props);
    if(this.props.data.twitter && this.props.data.twitter.hasOwnProperty('mean'))
      return (<span className="card-title ">{this.props.data.twitter.mean}</span>)
  }

  render() {
    // console.log(node)
    
    return (
      
      <div className = "row center-align blue-grey-text text-lighten-4">
          <div>
            <div>
              <div className="col s12 m3" >
                <div className="card z-depth-2 blue-grey darken-1">
                  <div className="card-content">
                    <span className="card-title ">{this.renderMean.call(this)}</span>
                    <p>Average Sentiment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="col s12 m3" >
                <div className="card z-depth-2 blue-grey darken-1">
                  <div className="card-content">
                    <span className="card-title">{this.props.percentNegative}</span>
                    <p>Negative %</p>
                  </div>
                </div>
              </div>
            </div>
          </div>          
          <div>
            <div >
              <div className="col s12 m3" >
                <div className="card z-depth-2 blue-grey darken-1">
                  <div className="card-content">
                    <span className="card-title">{this.props.percentPositive}</span>
                    <p>Positive %</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div >
              <div className="col s12 m3" >
                <div className="card z-depth-2 blue-grey darken-1">
                  <div className="card-content">
                    <span className="card-title">{this.props.sentimentCount}</span>
                    <p>Total Processed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>

    );
  }
}
// const mapStateToProps = (state) => {
//   return { twitter: state.bing };
// }


export default Metrics