import d3 from 'd3'

const node = document.createElement('div');

  var w = 300;
  var h = 300;

  var outerRadius = w / 2;
  var innerRadius = 0;
  var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  var pie = d3.layout.pie();

  //Easy colors accessible via a 10-step ordinal scale
  var color = d3.scale.category10();

  //Create SVG element
  var svg = d3.select(node)
    .append("svg")
    .attr("width", w)
    .attr("height", h);

function createNode(data) {
  let loldata = data;
  let resolved = false;
  let numbersData = [];
  let i = -1;
  // if(data) {
  //   resolved = true;
  //   data.forEach(num => numbersData.push(num[1]));
  // }
  // if(!resolved) {
  //   return document.createElement('div');
  // }
  console.log(numbersData, data)
  //Set up groups
  // var arcs = svg.selectAll("g.arc")
  //   .data(pie(numbersData))
  //   .enter()
  //   .append("g")
  //   .attr("class", "arc")
  //   .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

  // //Draw arc paths
  // arcs.append("path")
  //   .attr("fill", function(d, i) {
  //     return color(i);
  //   })
  //   .attr("d", arc);

  // //Labels
  // arcs.append("text")
  //   .attr("transform", function(d) {
  //     return "translate(" + arc.centroid(d) + ")";
  //   })
  //   .attr("text-anchor", "middle")
  //   .text(function(d) {
  //     i++;
  //     return data[i][0];
  //   });

  return node;
}

export default createNode