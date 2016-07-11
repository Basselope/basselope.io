import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button } from 'react-materialize'
import SearchBar from '../../containers/SearchBar.jsx'

class HomeLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to={"/"} style={{zIndex: 10000, float: 'right'}}>Home</Link>
    );
  }
}

const mapStateToProps = (state) => {
  return { alchemy: state.alchemy };
}

export default connect(mapStateToProps)(HomeLink)