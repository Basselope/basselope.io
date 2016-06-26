import React from 'react'
import { connect } from 'react-redux'

class BingList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderBingList() {
    return this.props.bing.data.map(suggestion => {
      return (
        <a key={suggestion} style={{cursor: 'pointer'}} className="collection-item blue-grey-text text-darken-2"
          onMouseOver={() => this.props.bingListClick(suggestion)} onClick={() => this.props.formSubmit(event)}>
          {suggestion}
        </a>
      );
    });
  }

  render() {
    if (!this.props.term)
      return <div style={{display:'none'}}></div>;
    return (
      <div className="collection card">{this.renderBingList()}</div>
    );
  }
}

const mapStateToProps = (state) => ({
  bing: state.bing
});

export default connect(mapStateToProps)(BingList)