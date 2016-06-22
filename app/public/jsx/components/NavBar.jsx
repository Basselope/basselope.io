import React from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { browserHistory } from 'react-router'
import SearchBar from '../containers/SearchBar.jsx'
import { Navbar, NavItem, Dropdown, Button, Icon } from 'react-materialize'

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button floating fab='vertical' icon='settings' large
          className='deep-orange lighten-2'
          style={{bottom: '45px', right: '24px'}}>
        <Button floating icon='trending_up' tooltip='timeline'
          className='deep-orange lighten-3'/>
        <Button floating icon='settings_ethernet' tooltip='tone-plot'
          className='deep-orange lighten-3'/>
        <Button floating icon='view_list' tooltip='overview'
          className='deep-orange lighten-3'/>
      </Button>
    );
  }
}

export default Nav



// style={{position: 'fixed', left: 0, right: 0}}

// <nav className="blue-grey lighten-4" style={{
//   position: 'fixed',
//     top: 0,
//     zIndex: 1000
// }}>
// <div className="nav-wrapper blue-grey lighten-2">
//   <a href="#!" className="brand-logo left blue-grey-text text-darken-2">BASSELOPE.io</a>
//   <SearchBar style={{zIndex: 0}} />
// <ul className="right">
//   <li>
//   <a className="btn-large btn-floating orange lighten-5">
//   <i className="large material-icons deep-orange-text text-darken-1">settings</i>
//   </a>
//   </li>
//   </ul>
//   </div>
//   </nav>