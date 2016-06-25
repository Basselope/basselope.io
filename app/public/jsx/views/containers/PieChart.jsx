import React from 'react'
import { connect } from 'react-redux'
import rd3 from 'react-d3-library'
import node from '../d3/d3Pie.jsx'

const RD3Component = rd3.Component

class PieChart extends React.Component {
  constructor(props) {
    super(props);

    // this.state = { d3: '' };
  }

  // componentDidMount() {
  //   this.setState({d3: this.props.d3});
  // }

  render() {
    console.log(this.props)
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Pie Chart of most common words with <b>{this.props.params.term}</b></h1>
        <RD3Component data={this.props.d3} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // return { reddit: state.reddit, twitter: state.twitter };
  return { d3: node(state.reddit.data.trendingTopics) };
}

export default connect(mapStateToProps)(PieChart)