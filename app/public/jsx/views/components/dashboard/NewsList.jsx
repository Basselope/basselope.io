import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class NewsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.alchemy)
    return (
      <Link to="/">NewsList</Link>
    );
  }
}

const mapStateToProps = (state) => {
  return { alchemy: state.alchemy };
}

export default connect(mapStateToProps)(NewsList)