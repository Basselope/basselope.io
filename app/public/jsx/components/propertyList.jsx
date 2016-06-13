import React from 'react'
var PropertyList = React.createClass({
    render: function() {
      var self = this;
      return (
        <ul id="suggestionList"  class="results">
          {
            this.props.list.map(function(listValue){
            return <li key={listValue} onClick={()=>{self.props.commitSearchCriteria(listValue)}}>{listValue}</li>;
          })
          }
        </ul>
      )
    }
  });

export default PropertyList