import React from 'react'
import { connect } from 'react-redux'

class Table extends React.Component {
  constructor(props) {
    super(props);

    // this.state = { redditData: {}, twitterData: {} };

    this.renderTable = this.renderTable.bind(this);
  }

  renderTable(key) {
    console.log(key);


    if(!this.props.data[key].hasOwnProperty('content') || Array.isArray(this.props.data[key].author.handle))
      return;

    let username = this.props.data[key].author.handle || 'N/A';
    let comment = this.props.data[key].content[0].text || 'N/A';
    let score = this.props.data[key].content[0].vote_count || 0;

    return (
      <tr>
        <td>{username}</td>
        <td>{comment}</td>
        <td>{score}</td>
      </tr>
    );
  }

  render() {
    console.log('TABLE:',this.props);
    return (
      <table className="bordered highlight">
        <thead>
          <tr>
            <th>User-Name</th>
            <th>Content-Body</th>
            <th>Vote-Count</th>
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
}

export default connect(mapStateToProps)(Table)