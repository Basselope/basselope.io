import React from 'react'
require('materialize-loader');
class Metrics extends React.Component {

  constructor(props) {
    super(props);
    this.state = {d3: ''}
  }

  componentDidMount() {
    this.setState({d3: "node"});
  }

  render() {
    // console.log(node)
    this.props = {sentimentCount:600, average:3, percentNegative: "40%", percentPositive:"48%"}
    return (
      
      <div className = "row center-align blue-grey-text text-lighten-4">
          <div>
            <div>
              <div className="col s12 m3" >
                <div className="card z-depth-2 blue-grey darken-1">
                  <div className="card-content">
                    <span className="card-title ">{this.props.average}</span>
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

export default Metrics