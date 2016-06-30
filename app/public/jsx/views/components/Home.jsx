import React from 'react'
import { connect } from 'react-redux'
import { Navbar, Row, Col, CardPanel, Chip, CardTitle, Card, Tabs, Tab } from 'react-materialize'
import SearchBar from '../containers/SearchBar.jsx'

class Home extends React.Component {

  constructor(props) {
    super(props);
  }


  hoverPopUp(content){
    return(
      <Col m={12} s={12}>
        <CardPanel style={{backgroundColor: 'inherit'}} textClassName='white-text' className='z-depth-1'>
           {content}
        </CardPanel>
      </Col>
    )
  }
  aboutColl(){
    return (
      <Row>
        <Col m={4} s={12}>
          <Card header={<CardTitle reveal image={"https://avatars1.githubusercontent.com/u/15223543?v=3&s=400"} waves='light'/>}
                title="Ben Chen"
                reveal={<p>Here is some more information about this product that is only revealed once clicked on.</p>}>
            <p><a href="#">This is a link</a></p>
          </Card>
        </Col>
        <Col m={4} s={12}>
          <Card header={<CardTitle reveal image={"https://avatars1.githubusercontent.com/u/15223543?v=3&s=400"} waves='light'/>}
                title="Rico Chen"
                reveal={<p>Here is some more information about this product that is only revealed once clicked on.</p>}>
            <p><a href="#">This is a link</a></p>
          </Card>
        </Col>
        <Col m={4} s={12}>
          <Card header={<CardTitle reveal image={"https://avatars1.githubusercontent.com/u/15223543?v=3&s=400"} waves='light'/>}
                title="Lukas Welinder"
                reveal={<p>Here is some more information about this product that is only revealed once clicked on.</p>}>
            <p><a href="#">This is a link</a></p>
          </Card>
        </Col>
      </Row>
    )
  }
  aboutUs(){
    return (
      <div>ABOUT US CONTENT</div>
    )
  }

  aboutTech(){
    return (
      <div style={{textAlign: 'center'}}>
        <h4>Tech Stack</h4>
        <Row>
          <Col m={12} s={12} l={12}>
            <Col m={4} s={4} l={4}>
              <img src="http://blog.tryolabs.com/wp-content/uploads/2015/04/logo-578x270.png" />
            </Col>
            <Col m={4} s={4} l={4}>
              <img src="https://raw.githubusercontent.com/reactjs/redux/master/logo/logo-title-dark.png" />
            </Col>
            <Col m={4} s={4} l={4}>
              <img src="https://camo.githubusercontent.com/66747a6e05a799aec9c6e04a3e721ca567748e8b/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313336353838312f313931383337332f32653035373166612d376462632d313165332d383436352d3839356632393164343366652e706e67" />
            </Col>
          </Col>
        </Row>
        <Row>
          <Col m={12} s={12} l={12}>
            <Col m={4} s={4} l={4}>
              <img src="http://vonectech.com/assets/global/img/expressjs.jpg.pagespeed.ce.UXzx2bpBWs.jpg" />
            </Col>
            <Col m={4} s={4} l={4}>
              <img src="https://nodeblog.files.wordpress.com/2011/07/nodejs.png" />
            </Col>
            <Col m={4} s={4} l={4}>
              <img src="http://design.altervista.org/wp-content/uploads/2015/01/Materialize.png" />Materialize CSS
            </Col>
          </Col>
        </Row>
        <Row>
          <Col m={12} s={12} l={12}>
            <Col m={4} s={4} l={4}>
              <img src="http://blog.apiabroad.com/wp-content/uploads/2015/03/reddit-logo.png" /> <h2>API</h2>
            </Col>
            <Col m={4} s={4} l={4}>
              <img src="http://img.labnol.org/di/wikipedia_logo.png" /> <h2>API</h2>
            </Col>
            <Col m={4} s={4} l={4}>
              <img src="http://i1.wp.com/enthusiastprogrammer.com/wp-content/uploads/2015/04/twitter-logo-blue.png" /> <h2>API</h2>
            </Col>
          </Col>
        </Row>
      </div>
    )
  }
  tabBuilder() {
    return (
      <Tabs className='tab-demo z-depth-1'>
        <Tab title="About Basselope" active>{this.hoverPopUp(this.aboutColl())}</Tab>
        <Tab title="About The Team" >{this.hoverPopUp(this.aboutUs())}</Tab>
        <Tab title="About The Tech">{this.hoverPopUp(this.aboutTech())}</Tab>
        <Tab title="Source">{this.hoverPopUp(this.aboutColl())}</Tab>
      </Tabs>
    );
  }

  render() {
    console.log("CLIENT SIDE LIFE",this.props);


    return (

        <div style={{height:'200vh'}}>
          <div style={{height:'100vh'}}>
            <p className="collection-header" style={{'textAlign': 'CENTER', 'fontSize': '60px' }}>Basselope</p>
            <p className="collection-item" style={{'textAlign': 'center'}}> A Natural Language Processing sentiment analysis tool on social media content</p>
            <div style={{zIndex: 3, width: '50%', left: 0, right: 0, margin: 'auto'}} >
              <SearchBar />
            </div>
          </div>
          <div style={{height:'100vh'}}>


            {this.tabBuilder()}


          </div>
        </div>


    );
  }
}

const mapStateToProps = (state) => {
  return {  };
}

export default connect(mapStateToProps)(Home)