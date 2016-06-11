import React from 'react'
var PropertyList = React.createClass({
    render: function() {
      return (
        <ul>
          {
            this.props.list.map(function(listValue){
            return <li key={listValue} onClick={()=>{this.props.commitSearchCriteria(listValue)}}>{listValue}</li>;
          })
          }
        </ul>
      )
    }
  });

export default PropertyList