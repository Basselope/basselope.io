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
    let comment = this.props.data[key].content[0].text;
    let score = this.props.data[key].content[0].vote_count || 0;

    return (
     <tr key={key}>
        <td>{username}</td>
         <td>{comment}</td>
         <td>{score}</td>
       </tr>
    );
  }

  render() {
    return (
      <table className="bordered highlight">
         <thead>
           <tr>
             <th>Username</th>
             <th>Comment</th>
             <th>Upvotes</th>
           </tr>
         </thead>
         <tbody>
           {Object.keys(this.props.data).map(this.renderTable)}
         </tbody>
       </table>
    );
  }
}

const mapStateToProps = (state) => {
  return { data: { ...state.reddit.data.data, ...state.twitter.data.data } };
};

export default connect(mapStateToProps)(Table)