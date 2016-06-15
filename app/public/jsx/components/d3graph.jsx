import React from 'react'
//import InitialGraph from './graphInitial.jsx'
import InitialGraph from 'react-d3-library'
const RD3Component = rd3.Component;

class d3graph extends React.Component {
	
	constructor(props) {
		super(props);
		console.log(InitialGraph)
	}
	render() {
		var node = document.createElement('div');

var diameter = 960,
    format = d3.format(",d"),
    color = d3.scale.category20c();

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select(node).append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

d3.json("flare.json", function(error, root) {
  if (error) throw error;

var bubbles = svg.selectAll(".node")
    .data(bubble.nodes(classes(flare))
    .filter(function(d) { return !d.children; }))
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

		<div>
        <RD3Component data={this.state.d3} />
      </div>
	}
}

export default d3graph