import React from 'react'

class List extends React.Component {
  constructor(props) {
    super(props);
  }
  select(val) {
    if(this.selectEvent) this.selectEvent(val);
    if(this.hideOnSelect) this.setState({list: []});
  }
  render() {
    return(
      <div style={!this.props.list.length ? {display: 'none'} : {display: 'block'}} className="collection">
        {
          this.props.list.map((val) =>
            <a className="collection-item" key={val}
               onClick={(e)=>{this.props.selectEvent(val)}}>{val}</a>)
        }
      </div>
    );
  }
  
}
export default List