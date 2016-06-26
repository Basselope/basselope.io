import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, Button } from 'react-materialize'
require('materialize-loader');

class HoverInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = { hover:false };

    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseOver (val) {
    var ben = val;
    this.setState({hover: true});
  }

  mouseOut (val) {
    this.setState({hover: false});
  }

  renderSummary() {
    if (this.state.hover) {
      return (
        <Card className='blue-grey darken-1' textClassName='white-text'>
          Basselope is a sentiment analysis application that gives a positive or negative view on keywords
          <br />
          Simply search in the input box for anything you would like to see data visualization on
        </Card>
      );
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Button onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} floating icon='info_outline' />
        </Row>
          <Col style={{position: 'fixed', right: 0}} m={3} s={6}>
            {this.renderSummary()}
          </Col>
      </div>
    );
  }
}




export default HoverInfo