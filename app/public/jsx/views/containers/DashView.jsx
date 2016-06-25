import React from 'react'
import { connect } from 'react-redux'

import rd3 from 'react-d3-library'
const RD3Component = rd3.Component;


class SentimentPlot extends React.Component {

  constructor(props) {
    super(props);
    // this.d3Render.bind(this);
  }

  d3Render(view) {
    console.log(view);
    let g = this.props.d3.graph;
    let render = g.hasOwnProperty(view) && !!g[view] ? g[view] : document.createElement('div');
    return (<RD3Component data={ render } />);
  }

  render() {
    console.log('plot',this.props);
    return (
      <div className="valign-wrapper" style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
        <div className="valign container center-align" style={{ left: 0, right: 0, overflow: 'visible' }}>
          {this.d3Render(this.props.route.path)}
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state,props) => ({
  d3: state.d3,
  data: {twitter:state.twitter.data, reddit:state.reddit.data}
});

export default connect(mapStateToProps)(SentimentPlot)