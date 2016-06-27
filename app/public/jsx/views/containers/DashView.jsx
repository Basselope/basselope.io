import React from 'react'
import { connect } from 'react-redux'

import d3 from '../components/dashboard/Graph.jsx'


class SentimentPlot extends React.Component {

  constructor(props) { super(props) }

  setView() {
    let view = this.props.params.view;
    let g = this.props.d3.graph;
    let render = (view in g) && !!g[view] ? d3.Graph(g[view]) : d3.Preload();
    return render;
  }

  render() {
    let view = this.props.params.view;
    let g = this.props.d3.graph;
    // let node = (view in g) ? d3.Graph(g[view]) : d3.Preload();
    return (
      <div className="dash-view">
        { d3.Graph(g[view]) }
      </div>
    );
  }

}

const mapStateToProps = (state,props) => ({ d3: state.d3 });

export default connect(mapStateToProps)(SentimentPlot)