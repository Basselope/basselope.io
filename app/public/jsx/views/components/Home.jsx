import React from 'react'
import { connect } from 'react-redux'
import { Navbar, Row, Col, Chip, Tabs, Tab } from 'react-materialize'
import SearchBar from '../containers/SearchBar.jsx'
class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  renderMean() {
    console.log(this.props)
    let twitterMean = this.props.twitter.data.metricMean;
    let redditMean = this.props.reddit.data.metricMean;
    let twitterSum = this.props.twitter.data.set.length;
    let redditSum = this.props.reddit.data.set.length;
    let totalMean = (((twitterMean * twitterSum) + (redditMean * redditSum)) / (redditSum + twitterSum)).toFixed(1);
    let displayMean = `${totalMean > 0 ? '+' : ''}${totalMean}%`;
    return displayMean;
  }


  cardBuilder() {
    return (

        <div class="row">
          <div class="col s12">
            <ul class="tabs">
              <li class="tab col s4"><a href="#test1">Test 1</a></li>
              <li class="tab col s4"><a class="active" href="#test2">Test 2</a></li>
              <li class="tab col s4 disabled"><a href="#test3">Disabled Tab</a></li>
            </ul>
          </div>
          <div id="test1" class="col s12">Test 1</div>
          <div id="test2" class="col s12">Test 2</div>
          <div id="test3" class="col s12">Test 3</div>
          <div id="test4" class="col s12">Test 4</div>
        </div>

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


            <Tabs className='tab-demo z-depth-1'>
              <Tab title="Test 1" active>About Us</Tab>
              <Tab title="Test 2">Source</Tab>
              <Tab title="Test 3">Tech</Tab>
            </Tabs>


            Just some content that iwll hold our about us info
          </div>
        </div>


    );
  }
}

const mapStateToProps = (state) => {
  return {  };
}

export default connect(mapStateToProps)(Home)