import React from 'react'
import { connect } from 'react-redux'

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = { redditData: {}, twitterData: {} };

    this.renderTable = this.renderTable.bind(this);
  }

  renderTable(key) {
    if (!this.state.redditData[key].content || Array.isArray(this.state.redditData[key].author.handle)
    || !this.state.twitterData[key].content || Array.isArray(this.state.twitterData[key].author.handle)) {
      return;
    }

    const redditUsername = this.state.redditData[key].author.handle || 'N/A';
    const redditComment = this.state.redditData[key].content[0].text || 'N/A';
    const redditScore = this.state.redditData[key].content[0].vote_count | 'N/A';
    const twitterUsername = this.state.twitterData[key].author.handle || 'N/A';
    const tweet = this.state.twitterData[key].content[0].text || 'N/A';

    return (
      <tr>
        <td>{redditUsername}</td>
        <td>{redditComment}</td>
        <td>{redditScore}</td>
        <td>{twitterUsername}</td>
        <td>{tweet}</td>
      </tr>
    );
  }

  render() {
    if (this.props.reddit.data.data) {
      this.state.redditData = this.props.reddit.data.data;
    }
    if (this.props.twitter.data.data) {
      this.state.twitterData = this.props.twitter.data.data;
    }

    return (
      <table className="bordered highlight">
        <thead>
          <tr>
            <th>Reddit Username</th>
            <th>Reddit Comment</th>
            <th>Upvotes</th>
            <th>Twitter Username</th>
            <th>Tweet</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys({...this.state.redditData, ...this.state.twitterData}).map(this.renderTable)}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return { reddit: state.reddit, twitter: state.twitter };
}

export default connect(mapStateToProps)(Table)