import d3 from 'd3'

const node = document.createElement('div');

const width = 600,
      height = 500;

const color = d3.scale.linear()
  .range(['#aad', '#556']);

const svg = d3.select(node).append('svg')
  .attr('width', width)
  .attr('height', height);

const attr = {
  x: (d) => (d.x),
  y: (d) => (d.y),
  r: (d) => (d.r)
}

function plot(d) {
  let xRange = d3.extent(d,(val) => val[0]);
  let xShift = Math.ceil( Math.abs(xRange[0]) );
  let xSpread = Math.floor((width - xShift) / (xShift + xRange[1]));
  let x = (x) => xSpread * (x + xShift);

  let yRange = d3.extent(d,(val) => val[1]);
  let yShift = Math.ceil(1.5 * yRange[1]);
  let ySpread = Math.floor(height / (yShift + yRange[1]));
  let y = (y) => height - ySpread * (y + 7);

  let r = (r) => Math.min((r * 1.3) + 7, 22);
  console.log(xRange,yRange);
  return d.map((val) => ({ x: x(val[0]), y: y(val[1]), r: r(val[1]) }))
}

// This function will be triggered on load
function transition() {
  d3.selectAll('circle')
    .transition()
    .duration(3000)
    .style('opacity', .7)
}

svg.on('mount', function() {
  transition();
});

const createNode = function(...data) {
  let resolved = false;
  if(data)
    resolved = data.reduce((curr,val) =>
      curr ? val.hasOwnProperty('set') : false, true);
  if(!resolved)
    return document.createElement('div');
  let d = data.reduce((curr,val) => [].concat(curr,val.set), []);
  svg.selectAll('circle')
    .data(plot(d))
    .enter().append('circle')
    .attr('cx', attr.x)
    .attr('cy', attr.y)
    .attr('r', attr.r)
    .style('fill', function() { return color(Math.random()); })
    .style('opacity', .7);
  console.log(svg);
  return svg[0][0];
};

export default createNode