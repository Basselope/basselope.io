import React from 'react'

import { Navbar, Row, Col, CardPanel, Chip, CardTitle, Card, Tabs, Tab } from 'react-materialize'

const Tech = (props) => (
  
    <Col s={12} m={4} className="flow-text center-align">
      <button className="btn-floating btn-large waves-light blue-grey darken-2">
        <i style={{fontSize: '32px'}} className="devicon-nodejs-plain blue-grey-text text-lighten-2"></i>
      </button>
    </Col>
  
);

export default Tech

//
// <div className="container">
//   <Row style={{minHeight: '30vh'}} className="valign-wrapper">
//   <Col s={12} m={7} className="flow-text right-align valign">
//   Thanks to the non-blocking I/O nature of Node.js, Basselope is capable of collecting, parsing, and feeding
// massive sets of data to the client without breaking a sweat.
// </Col>
// <Col s={12} m={4} className="center-align offset-m1 blue-grey-text text-darken-2 valign">
//   <i style={{fontSize: '110px'}} className="devicon-nodejs-plain"></i>
//   </Col>
//   </Row>
//   <div className="divider"></div>
//   <Row style={{minHeight: '30vh'}} className="valign-wrapper">
//   <Col s={12} m={4} className="center-align blue-grey-text text-darken-2 valign">
//   <i style={{fontSize: '110px'}} className="devicon-react-plain"></i>
//   </Col>
//   <Col s={12} m={7} className="flow-text offset-m1 left-align valign">
//   React was chosen to handle client views and routing. As for data-flow, Redux reduces the need to make
//   subsequent requests to the server, further optimizing the capacity of Basselope.
// </Col>
// </Row>
// <div className="divider"></div>
// <Row style={{minHeight: '30vh'}} className="valign-wrapper">
//   <Col s={12} m={7} className="flow-text right-align valign">
//     Basselope uses D3 to both contextualize and visualize the wealth of data handed back from our server.
//     Careful throught has been put into making the data meaningful to the user.
//   </Col>
//   <Col s={12} m={4} className="center-align offset-m1 blue-grey-text text-darken-2 valign">
//     <i style={{fontSize: '100px'}} className="devicon-d3js-plain"></i>
//     </Col>
//     </Row>
//
//     </div>