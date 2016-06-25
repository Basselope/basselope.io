import React from 'react'
import { connect } from 'react-redux'
require('materialize-loader');

class HoverInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hover:false};
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseOver (val) {
    var ben = val;
    this.setState({hover: true});
  }

  mouseOut (val) {
        this.setState({hover: false});
  }

  render() {
    var position = {position:"absolute"};
    var label = "";
    var content = ""
    var display = {display:"none", position:"absolute"}
        if (this.state.hover) {
            label = "Normal Graph";
            content = "Graph displays sentiment of trending data against the sentiment's social impact";
            display={display:"block", position:"absolute", bottom:"0px"};
        }
        var self = this;
        return(
              <div>
                <span onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} > <img style={{width:"20px", position: "absolute", bottom: "0px"}} src='https://openclipart.org/image/2400px/svg_to_png/234546/Info-Button.png'/> </span>
                <div style = {display} className="row">
                  <div className="col s12 m6" >
                    <div className="card blue-grey darken-1">
                      <div className="card-content white-text">
                        <span className="card-title">{label}</span>
                        <p>{content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )
  }
}




export default HoverInfo