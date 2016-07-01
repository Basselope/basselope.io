import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import { Card } from 'react-materialize'

import d3 from '../components/dashboard/Graph.jsx'
import { fetchBing } from '../../actions/api/bing.jsx'
import { fetchReddit } from '../../actions/api/reddit.jsx'
import { fetchTwitter } from '../../actions/api/twitter.jsx'
import { fetchAlchemy } from '../../actions/api/alchemy.jsx'
import { fetchWikipedia } from '../../actions/api/wikipedia.jsx'
import { resetState } from '../../actions/resetState.jsx'


class SentimentPlot extends React.Component {

  constructor(props) { super(props) }

  setView() {
    let view = this.props.params.view;
    let g = this.props.d3.graph;
    let render = (view in g) && !!g[view] ? d3.Graph(g[view]) : d3.Preload();
    return render;
  }

  handleClick(term) {
    this.props.resetState();

    this.props.fetchReddit(term);
    this.props.fetchTwitter(term);
    this.props.fetchWikipedia(term);

    const path = `/${term}/plot`.replace(/\W^[/]/g, '-');
    browserHistory.push(path);
  }

  render() {
    let term = '';
    if (this.props.d3.data.reddit) {
      term = this.props.params.term;
    }
    let view = this.props.params.view;
    let g = this.props.d3.graph;
    let title="Graph";
    switch(view){
      case "pie":
        title="Related Topics";
        break;
      case "plot":
        title = "Sentiment Analysis over Weighted Ranking";
        break;
      case "time":
        title="Sentiment Tone over Time";
        break;
    }
    // let node = (view in g) ? d3.Graph(g[view]) : d3.Preload();
    return (
      <div className="dash-view">
      <h2 style={{marginTop: '80px', color: 'gray'}}><i>{term}</i></h2>
        { d3.Graph(g[view], title) }
      </div>
    );
  }

}

const mapStateToProps = (state,props) => ({ d3: state.d3 });

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchBing, fetchReddit, fetchTwitter, fetchWikipedia, fetchAlchemy, resetState }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SentimentPlot)