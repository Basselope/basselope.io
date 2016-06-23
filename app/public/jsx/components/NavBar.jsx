import React from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { browserHistory, Link } from 'react-router'
import SearchBar from '../containers/SearchBar.jsx'
import { Navbar, NavItem, Dropdown, Button, Icon } from 'react-materialize'

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  toOverview() {

    browserHistory.push(path);
  }

  toTimeline() {

  }

  toPlot() {

  }

  render() {
    return (
      <Button floating fab='vertical' icon='settings' large
          className='blue-grey darken-1'
          style={{bottom: '45px', right: '24px'}}>
        <Link to={`/${this.props.baseURL}/table`}>
          <Button floating icon='view_list' tooltip='table'
            className='blue-grey lighten-1'/>
        </Link>
        <Link to="/timeline">
          <Button floating icon='trending_up' tooltip='timeline'
            className='blue-grey lighten-1'/>
        </Link>
        <Link to={`/${this.props.baseURL}/tone-plot`}>
          <Button floating icon='settings_ethernet' tooltip='tone-plot'
            className='blue-grey lighten-1'/>
        </Link>
      </Button>
    );
  }
}

export default Nav

// ${this.props.baseURL}/

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