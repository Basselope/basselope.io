import React from 'react'
// var PropertyList = React.createClass({
//     render: function() {
//       var self = this;
//       return (
//           <div className="results col s8 justify-s2 m6 justify-m3 collection">
//             {
//               this.props.list.map(function(listValue){
//               return <a className="collection-item" key={listValue} onClick={()=>{self.props.commitSearchCriteria(listValue)}}>{listValue}</a>
//             })
//             }
//           </div>
//       );
//     }
//   });

class List extends React.Component {
  constructor(props) {
    // if(props.list.length === 0) props.visible = {display: 'none'};
    super(props);
    // this.setState({
    //   items: props.list || [],
    //   visible: props.list.length ? {display: 'none'} : {display: 'block'},
    //   selectEvent: props.selectEvent || null,
    //   hideOnSelect: props.hideOnSelect || false
    // });
    // if(this.props.list.length === 0) this.state = {visible: {display: 'none'}};
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