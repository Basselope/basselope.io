import React from 'react'
import { connect } from 'react-redux'

import { Collection, CollectionItem, Card, Badge } from 'react-materialize'

class Table extends React.Component {
  constructor(props) {
    super(props);

    // this.state = { redditData: {}, twitterData: {} };

    this.renderTable = this.renderTable.bind(this);
  }

  renderTable(key) {

    if(!this.props.data[key].hasOwnProperty('content') || this.props.data[key].author.handle.includes('['))
      return;

    let username = this.props.data[key].author.handle;
    let content = this.props.data[key].content;
    let score = this.props.data[key].content[0].vote_count || 0;

    return (
      <Collection key={key} header={username}>
        {content.map((val) => (<CollectionItem key={`${key}1`}>{val.text}<Badge>{val.score}</Badge></CollectionItem>))}
      </Collection>
    );
  }

  render() {
    return (
      <div>
        <div className="container">
          {Object.keys(this.props.data).map(this.renderTable)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { data: { ...state.reddit.data.data, ...state.twitter.data.data } };
}

export default connect(mapStateToProps)(Table)