import React from 'react'
import { connect } from 'react-redux'
import { Navbar, Row, Col, CardPanel, Chip, CardTitle, Card, Tabs, Tab } from 'react-materialize'
import SearchBar from '../containers/SearchBar.jsx'

import Tech from './about/Tech.jsx'

class Home extends React.Component {

  constructor(props) {
    super(props);
  }


  hoverPopUp(content){
    return(
      <div>
           {content}
      </div>
    )
  }
  aboutUs(){
    return (
      <Row>
        <Col m={4} s={12}>
          <Card header={<CardTitle reveal image={"https://avatars2.githubusercontent.com/u/2400070?v=3&s=460"} waves='light'/>}
                title="Ben Chen   (+Oliver)"
                reveal={<div>Product Owner<br/>Ben Chen graduated from NYU with a computer scienc</div>}>
            <p><a href="https://github.com/byc219" target="_blank">Github</a></p>
          </Card>
        </Col>
        <Col m={4} s={12}>
          <Card header={<CardTitle reveal image={"https://avatars2.githubusercontent.com/u/16439986?v=3&s=400"} waves='light'/>}
                title="Rico Chen"
                reveal={<div>Full Stack Software Engineer<br/><br/>How much does a penguin weigh?...<div>Enough to break the ice! <br/>Hi, I'm Rico and one day I'd like to work at Pied Piper.</div></div>}>
            <p><a href="https://github.com/ricochen" target="_blank">Github</a></p>
          </Card>
        </Col>
        <Col m={4} s={12}>
          <Card header={<CardTitle reveal image={"https://avatars1.githubusercontent.com/u/15223543?v=3&s=400"} waves='light'/>}
                title="Lukas Welinder"
                reveal={<div>Scrum Master<br/> Lukas is a human with stuff about him</div>}>
            <p><a href="https://github.com/lukaswelinder" target="_blank">Github</a></p>
          </Card>
        </Col>
      </Row>
    )
  }
  aboutColl(){
    return (
      <div>Basselope
        <p>When browsing through popular social media platforms such as twitter or reddit, have you ever wanted to know what other people thought of a particular topic? For example, the recent NBA finals where the calvs beat the warriors. Is Lebron James winning and Stephen Curry losing a positive or negative outcome? We created an application called Basselope that performs data visualization of social media content using sentiment analysis. For example, a sample piece of data would be a tweet that says: Curry deserved to win! and we use our algorithm to determine this tweets sentiment.</p>

        <p>Simply by searching a topic in Basselope, a data visualized graph is displayed that shows a sample size of aggregated social media content and its sentiment values. Each bubble is a data piece and the size of the bubble, as well as its height indicates its strength. Whereas the horizontal axis displays the bubble's sentiment. So in this case, the metrics at the top and the graph show that lebron james has an overall 'positive or negative' weighted sentiment, maybe because he just won an NBA championship. How our sentiment works is … 'explain more about algorithm here'</p>

        <p>What if we want to see what people thought of Lebron James before he won the championship? We have a timeplot that shows the sentiment for a topic in the past and present. Based on the graph, it seems he had a negative sentiment before, and only recently has his sentiment been positive.</p>

          <p> Ok, that's cool and all but what about topics that are related to lebron james? Oh, then just click this pie chart! It shows the most common words associated with the searched topic, and it seems people like to say 'x' and lebron james in the same sentence.</p>

            <p>Of course, for the very curious user who wants to see the actual tweet or comment that led to the sentiment analysis of lebron james, they can go to the table. It shows all of our data from our api sources twitter, reddit and Wikipedia. Let's choose a sample, *go to reddit comment* User 'x' commented 'xxxxxxx lebron james xxxxxxx' with 20 upvotes!</p>

        <p> Now we can confirm that other people hate Lebron James just as much as us!
        The technologies we used are react and redux on the front-end
        We used express and nodejs on the back-end. For the build tools, we used webpack to bundle the files and gulp</p></div>
    )
  }

  aboutTech(){
    return (
      <div className="container center-align">
        <h4>Tech Stack</h4>
        <Row>
          <Col s={12}>
            <Col s={3}>
              <img style={{maxWidth: '64px', maxHeight: '64px'}} src="/assets/nodejs_logo.svg" />
            </Col>
            <Col s={3}>
              <img style={{maxWidth: '64px', maxHeight: '64px'}} src="/assets/react_logo.svg" />
            </Col>
            <Col s={3}>
              <img style={{maxWidth: '64px', maxHeight: '64px'}} src="/assets/redux_logo.svg" />
            </Col>
            <Col s={3}>
              <img style={{maxWidth: '64px', maxHeight: '64px'}} src="/assets/d3_logo.svg" />
            </Col>
          </Col>
        </Row>
        <Row>
          <Col s={12}>
            <Col s={2} className="offset-s3">
              <img style={{maxWidth: '64px', maxHeight: '64px'}} src="/assets/twitter_logo.svg" />
            </Col>
            <Col s={2}>
              <img style={{maxWidth: '64px', maxHeight: '64px'}} src="/assets/wikinews_logo.svg" />
            </Col>
            <Col s={2}>
              <img style={{maxWidth: '64px', maxHeight: '64px'}} src="/assets/reddit_logo.svg" />
            </Col>
          </Col>
        </Row>
      </div>
    )
  }
  tabBuilder() {
    return (
      <Tabs style={{width: '100vw'}}>
        <Tab className='blue-grey darken-2 blue-grey-text text-darken-2' title="BASSELOPE" active>{this.hoverPopUp(this.aboutColl())}</Tab>
        <Tab className='blue-grey darken-2 blue-grey-text text-darken-2' title="THE TEAM" >{this.hoverPopUp(this.aboutUs())}</Tab>
        <Tab className='blue-grey darken-2 blue-grey-text text-darken-2' title="THE TECH">{this.hoverPopUp(this.aboutTech())}</Tab>
      </Tabs>
    );
  }

  render() {

    return (

        <div>
          <div style={{minHeight:'100vh'}}>
            <p className="collection-header" style={{'textAlign': 'CENTER', 'fontSize': '60px' }}>Basselope</p>
            <p className="collection-item" style={{'textAlign': 'center'}}> A Natural Language Processing sentiment analysis tool on social media content</p>
            <div style={{zIndex: 3, width: '50%', left: 0, right: 0, margin: 'auto'}} >
              <SearchBar />
            </div>
          </div>
          <div style={{minHeight:'100vh'}}>


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