import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class HomeLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props.alchemy)
    return (
      <Link to="/">
        <Button value='Search' floating icon='search' tooltip='search'
          className='blue-grey lighten-1'/>
      </Link>
    );
  }
}

const mapStateToProps = (state) => {
  return { alchemy: state.alchemy };
}

export default connect(mapStateToProps)(HomeLink)