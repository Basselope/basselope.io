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
    // console.log(this.props.alchemy)
    return (
      <div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { alchemy: state.alchemy };
}

export default connect(mapStateToProps)(HomeLink)