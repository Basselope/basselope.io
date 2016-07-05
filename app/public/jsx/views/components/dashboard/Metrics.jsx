import React from 'react'
import { connect } from 'react-redux'
import { Breadcrumb, Row, Col, Chip, Button, MenuItem } from 'react-materialize'
import SearchBar from '../../containers/SearchBar.jsx'

class Metrics extends React.Component {
  constructor(props) {
    super(props);
  }

  renderCrumbs() {
    let view = '';
    switch(this.props.params.view) {
      case 'plot':
        view = 'sentiment distribution';
        break;
      case 'pie':
        view = 'related topics by occurance';
        break;
      case 'time':
        view = 'sentiment extremes over time';
        break;
      default:
        view = '~';
        break;
    }
    return `${this.props.params.term}: ${view}`;
  }

  renderMean() {
    let twitterMean = this.props.twitter.data.metricMean;
    let redditMean = this.props.reddit.data.metricMean;
    let twitterSum = this.props.twitter.data.set.length;
    let redditSum = this.props.reddit.data.set.length;
    let totalMean = (((twitterMean * twitterSum) + (redditMean * redditSum)) / (redditSum + twitterSum)).toFixed(1);
    let displayMean = `${totalMean > 0 ? '+' : ''}${totalMean}`;
    return displayMean;
  }

   renderNegPercent() {
    const twitterPercentNeg = this.props.twitter.data.percentNegative;
    const redditPercentNeg = this.props.reddit.data.percentNegative;
    const twitterSum = this.props.twitter.data.set.length;
    const redditSum = this.props.reddit.data.set.length;
    const totalPercent = ((twitterPercentNeg * twitterSum) + (redditPercentNeg * redditSum)) / (redditSum + twitterSum);
    const percentFixed = (totalPercent * 100).toFixed(1);
    return percentFixed;
  }

  renderNeutralPercent() {
    return (100 - this.renderPosPercent() - this.renderNegPercent()).toFixed(1);
  }

  renderPosPercent() {
    const twitterPercentPos = this.props.twitter.data.percentPositive;
    const redditPercentPos = this.props.reddit.data.percentPositive;
    const twitterSum = this.props.twitter.data.set.length;
    const redditSum = this.props.reddit.data.set.length;
    const totalPercent = ((twitterPercentPos * twitterSum) + (redditPercentPos * redditSum)) / (redditSum + twitterSum);
    const percentFixed = (totalPercent * 100).toFixed(1);
    return percentFixed;
  }

  renderTotal() {
    const totalSize = this.props.twitter.data.set.length + this.props.reddit.data.set.length;
    return totalSize;
  }

  chipBuilder(title, stats) {
    return (
      <Col>
        <Chip waves='light'>{title} {stats}</Chip>
      </Col>
    );
  }

  render() {
    let hide = !this.props.twitter.data.hasOwnProperty('set') || !this.props.reddit.data.hasOwnProperty('set');
    return (
      <div>
        <nav style={{position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1}} className='blue-grey lighten-2'>
          <div className="nav-wrapper blue-grey lighten-2 z-depth-2">
            <Row>
              <Button style={{width: '250px', paddingLeft: 0, paddingRight: 0, marginLeft: '12px'}}
                      className='blue-grey darken-2' waves='light'>
                <SearchBar />
              </Button>
            </Row>
          </div>
          <div className="center-align blue-grey lighten-3 z-depth-1">
            <Row>
              <Col className="flow-text blue-grey-text text-darken-1 left">
                  {hide ? null : `~ ${this.props.params.term.toUpperCase()}`}
              </Col>
              <div className="hide-on-med-and-down right">
                {hide ? null : this.chipBuilder('samples |', this.renderTotal())}
                {hide ? null : this.chipBuilder('negative |', `${this.renderNegPercent()}%`)}
                {hide ? null : this.chipBuilder('neutral |', `${this.renderNeutralPercent()}%`)}
                {hide ? null : this.chipBuilder('positive |', `${this.renderPosPercent()}%`)}
              </div>
            </Row>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { reddit: state.reddit, twitter: state.twitter, wiki: state.wiki };
};

export default connect(mapStateToProps)(Metrics)