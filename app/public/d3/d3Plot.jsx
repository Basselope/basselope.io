import d3 from 'd3'

const node = document.createElement('div');

const width = 600,
      height = 300;

const attr = {
  x: (d) => (d.x),
  y: (d) => (d.y),
  r: (d) => (d.r)
};

const style = {
  c: (d) => (d.c)
};

const color = d3.scale.linear()
  .range(['#f80', '#08f']); // '#f80', '#58b', '#08f', '#0f9'

const map = {
  x: (d, x) => (width / 2) + (x * (width / 2 / Math.min(...d3.extent(d,(val) => val[0]).map((v) => Math.abs(v))))),
  y: (d, y) => height - ((height / d3.extent(d,(val) => val[1])[1]) * y),
  r: (r) => 3 * Math.min((r * .9) + 3, 22),
  c: (d, x) => color(map.x(d,x) / width)
};

const svg = d3.select(node).append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('overflow', 'visible');

const labal = {
  mean: (d) => d3.mean(d,(val) => val[1]),
  dev: (d) => d3.deviation(d,(val) => val[1])
}

function plot(d) {
  // let xRange = d3.extent(d,(val) => val[0]);
  // let xSpread = width / 2 / Math.max(...Math.abs.apply(xRange));
  return d.map((val) => ({
    c: map.c(d,val[0]),
    x: map.x(d,val[0]),
    y: map.y(d,val[1]),
    r: map.r(val[1])
  }));
}

function transition(count) {
  d3.selectAll('circle')
    .transition()
    .delay((d,i) => (i * 33 + (count - i)))
    .duration(420)
    .attr('r', attr.r)
    .attr('cy', attr.y);
}

const createNode = function(...data) {
  let resolved = false;
  if(data)
    resolved = data.reduce((curr,val) => curr ? val.hasOwnProperty('set') : false, true);
  if(!resolved)
    return document.createElement('div');

  let d = data.reduce((curr,val) => [].concat(curr,val.set), []);
  // let mean = plot.x(label.mean(d));
  // let dev = plot.x(label.dev(d));

  // svg.selectAll('path')
  //   .append('path')
  //   .attr('x1', mean)
  //   .attr('x2', mean)
  //   .attr('y1', height)
  //   .attr('y2', 0)
  //   .attr("stroke", "black")
  //   .attr("stroke-width", "3")
  //   .style('opacity',.7);

  svg.selectAll('circle')
    .data(plot(d))
    .enter().append('circle')
    .attr('cx', attr.x)
    .attr('cy', height)
    .attr('r', 0)
    .style('fill', style.c)
    .style('opacity', .7)
    .on('mount', function() {
      transition(d.length);
    });

  return svg[0][0];
};

export default createNode