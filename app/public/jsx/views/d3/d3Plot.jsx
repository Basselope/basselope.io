import d3 from 'd3'

const node = document.createElement('div');

const width = 600,
      height = 300;

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

const metric = {
  mean: (d) => d3.mean(d,(val) => val[0]),
  dev: (d) => d3.deviation(d,(val) => val[0])
};

const label = (d) => {
  let dev = map.x(d,metric.dev(d))/2;
  let mean = map.x(d,metric.mean(d));

  return [{
    x: mean,
    y1: -50,
    y2: height+150,
    class: 'plot-mean'
  },{
    x: mean - dev,
    y1: height,
    y2: height+50,
    class: 'plot-sdNeg'
  },{
    x: mean + dev,
    y1: height,
    y2: height+50,
    class: 'plot-sdPos'
  }]
};

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
    .each((d,i) => {
      if(i === count-1)
        d3.selectAll('line')
          .transition()
          .duration(700)
          .attr('x1', (d) => d.x)
          .attr('x2', (d) => d.x)
          .style('opacity', .5);
    })
    .attr('r', (d) => d.r)
    .attr('cy', (d) => d.y);
}

const createNode = function(...data) {
  console.log('PLOT:', data);
  let resolved = false;
  if(data)
    resolved = data.reduce((curr,val) => val || curr ? val.hasOwnProperty('set') : false, true);
  if(!resolved)
    return null; //document.createElement('div');

  let d = data.reduce((curr,val) => [].concat(curr,val.set), []);
  let mean = map.x(d,metric.mean(d));
  let dev = map.x(d,metric.dev(d));

  svg.selectAll('circle')
    .data(plot(d))
    .enter().append('circle')
    .attr('cx', (d) => d.x)
    .attr('cy', height)
    .attr('r', 0)
    .style('fill', (d) => d.c)
    .style('opacity', .7)
    .on('mount', function() {
      transition(d.length);
    });

  svg.selectAll('line')
    .data(label(d))
    .enter().append('line')
    .attr('y1', (d) => d.y1)
    .attr('y2', (d) => d.y2)
    .attr('x1', width/2)
    .attr('x2', width/2)
    .attr("stroke", "gray")
    .attr("stroke-width", 3)
    .attr('class', (d) => d.class)
    .style('opacity',1);

  return svg[0][0];
};

export default createNode