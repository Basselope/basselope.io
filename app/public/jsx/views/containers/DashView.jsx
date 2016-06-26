import React from 'react'
import { connect } from 'react-redux'

import d3Render from '../components/dashboard/Graph.jsx'


class SentimentPlot extends React.Component {

  constructor(props) { super(props) }

  render() {
    let view = this.props.params.view;
    let g = this.props.d3.graph;
    return (
      <div className="dash-view">
        { (view in g) ? d3Render(g[view]) : d3Render('something went wrong :(') }
      </div>
    );
  }

}

const mapStateToProps = (state,props) => ({ d3: state.d3 });

export default connect(mapStateToProps)(SentimentPlot)