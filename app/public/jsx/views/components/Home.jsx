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
        <CardPanel className='blue-grey darken-1' textClassName='white-text'  >
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
  tabBuilder() {
    return (
      <Tabs className='tab-demo z-depth-1'>
        <Tab title="About Collatio" active>{this.hoverPopUp(this.aboutColl())}</Tab>
        <Tab title="About The Team" >{this.hoverPopUp(this.aboutUs())}</Tab>
        <Tab title="About The Tech">{this.hoverPopUp(this.aboutColl())}</Tab>
        <Tab title="Source">{this.hoverPopUp(this.aboutColl())}</Tab>
      </Tabs>
    );
  }

  render() {
    console.log("CLIENT SIDE LIFE",this.props);


    return (

        <div style={{height:'200vh'}}>
          <div style={{height:'100vh'}}>
            <p className="collection-header" style={{'textAlign': 'CENTER', 'fontSize': '60px' }}>Collatio.io</p>
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