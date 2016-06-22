import React from 'react'
import { connect } from 'react-redux'

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {data: {}};
    this.renderTable = this.renderTable.bind(this);
  }

  renderTable(key) {
    if (!this.state.data[key].content || Array.isArray(this.state.data[key].author.handle)) {
      return;
    }

    const username = this.state.data[key].author.handle;
    const comment = this.state.data[key].content[0].text;
    const score = this.state.data[key].content[0].vote_count;

    return (
      <tr>
        <td>{username}</td>
        <td>{comment}</td>
        <td>{score}</td>
      </tr>
    );
  }

  render() {
    if (this.props.reddit.data.data) {
      this.state.data = this.props.reddit.data.data;
    }

    return (
      <table className="bordered highlight">
        <thead>
          <tr>
            <th>Reddit Username</th>
            <th>Reddit Comment</th>
            <th>Upvotes</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(this.state.data).map(this.renderTable)}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return { reddit: state.reddit };
}

export default connect(mapStateToProps)(Table)