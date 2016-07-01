import React from 'react'
import { Link } from 'react-router'

import { Button } from 'react-materialize'

import SearchBar from '../../containers/SearchBar.jsx'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      
      <Button floating fab='vertical' icon='settings' large
          className='blue-grey darken-1'
          style={{bottom: '45px', right: '24px'}}>
        <Link to={`/${this.props.baseURL}/pie`}>
          <Button floating icon='pie_chart' tooltip='pie'
            className='blue-grey lighten-1'/>
        </Link>
        <Link to={`/${this.props.baseURL}/time`}>
          <Button floating icon='timeline' tooltip='timeline'
            className='blue-grey lighten-1'/>
        </Link>
        <Link to={`/${this.props.baseURL}/plot`}>
          <Button floating icon='bubble_chart' tooltip='tone-plot'
            className='blue-grey lighten-1'/>
        </Link>
      </Button>
    );
  }
}

// <Link to={`/${this.props.baseURL}/table`}>
//   <Button floating icon='view_list' tooltip='table'
//           className='blue-grey lighten-1'/>
// </Link>

export default NavBar