import d3 from 'd3'

const node = document.createElement('div');

const width = 700,
      height = 300;

const color = d3.scale.linear()
  .range(['#fc1', '#9cc', '#aad']);
  // .range(['#aad', '#556']);

const svg = d3.select(node).append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('overflow', 'visible');

const attr = {
  x: (d) => (d.x),
  y: (d) => (d.y),
  r: (d) => (d.r)
};

const style = {
  c: (d) => (d.c)
}

function plot(d) {
  let xRange = d3.extent(d,(val) => val[0]);
  let xSpread = width / 2 / Math.max(Math.abs(...xRange));
  let x = (x) => (width / 2) + (x * xSpread);

  let yRange = d3.extent(d,(val) => val[1]);
  let ySpread = height / yRange[1];
  let y = (y) => height - ySpread * y;

  let r = (r) => Math.min((r * 1.3) + 5, 22);

  let c = (c) => color(x(c) / width);

  return d.map((val) => ({
    x: x(val[0]),
    y: y(val[1]),
    r: r(val[1]),
    c: c(val[0])
  }));
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
    .style('fill', style.c)
    .style('opacity', .7);
  return svg[0][0];
};

export default createNode