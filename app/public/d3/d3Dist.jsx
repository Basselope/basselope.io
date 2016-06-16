import d3 from 'd3'

const node = document.createElement('div');

const sets = 4, // number of layers
    samples = 300, // number of samples per layer
    stack = d3.layout.stack().offset("zero"),
    layers = stack(d3.range(sets).map(function() { return bumpLayer(samples); }))

const width = 500,
  height = 300;

const x = d3.scale.linear()
  .domain([0, samples - 1])
  .range([0, width]);

const y = d3.scale.linear()
  .domain([0, d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); })])
  .range([height, 0]);

const color = d3.scale.linear()
  .range(['#aad', '#556']);

const area = d3.svg.area()
  .x(function(d) { return x(d.x); })
  .y0(function(d) { return y(d.y0); })
  .y1(function(d) { return y(d.y0 + d.y); });

const svg = d3.select(node).append('svg')
  .attr('width', width)
  .attr('height', height);

svg.selectAll('path')
  .data(layers)
  .enter().append('path')
  .attr('d', area)
  .style('fill', function() { return color(Math.random()); })
  .style('opacity', 0);

svg.on('mount', function() {
  transition();
});

// This function will be triggered on load
function transition() {

  d3.selectAll('path')
    .transition()
    .duration(3000)
    .style('opacity', .7)

}

function bumpLayer(n) {

  function bump(a) {
    let x = 1 / (.1 + Math.random()),
      y = 2 * Math.random() - .5,
      z = 10 / (.1 + Math.random());
    for (let i = 0; i < n; i++) {
      let w = (i / n - y) * z;
      a[i] += x * Math.exp(-w * w);
    }
  }

  let a = [], i;
  for (i = 0; i < n; ++i) a[i] = 0;
  for (i = 0; i < 5; ++i) bump(a);
  return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
}

console.log(bumpLayer(200));

const createNode = function(data) {
  console.log(data);
  if(data)
    return node;
  return document.createElement('div');
};

export default createNode