import React from 'react'
import rd3 from 'react-d3-library'
const RD3Component = rd3.Component;

import { Preloader, Chip, Row, Col } from 'react-materialize'

const Preload = () => (
  <div className="valign-wrapper" style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
    <div className="valign container center-align" style={{ left: 0, right: 0, overflow: 'visible' }}>
      <Preloader />
    </div>
  </div>
);

const Header = (info) =>(
  <Row>
    <Col s={12}>
      <Chip>
        {info}
      </Chip>
    </Col>
  </Row>
);

const Graph = (node, title) => (
  <div className="valign-wrapper" style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
    <div className="valign container center-align" style={{ left: 0, right: 0, overflow: 'visible' }}>
      { node ? (<div className="graphTitle">  {Header(title)}</div>) : (<Preloader />) }
      <RD3Component data={ node  || document.createElement('div') } />

    </div>
  </div>
);

export default { Graph, Preload }