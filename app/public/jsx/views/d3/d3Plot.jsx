import d3 from 'd3'

const node = document.createElement('div');

const width = 600,
      height = 300;


const svg = d3.select(node).append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('overflow', 'visible');

const Map = (d) => {
  let xRange = d3.extent(d,(val) => val[0]);
  let yRange = d3.extent(d,(val) => val[1]).map((v) => v < 0 ? 0 : v);

  let xRangeMax = Math.max(...xRange.map((v) => Math.abs(v)));

  let Mean = d3.mean(d,(val) => val[0]);
  let Dev = d3.deviation(d,(val) => val[0]);

  let X = (v) => d3.scale.linear().domain([-xRangeMax,xRangeMax]).range([0,width])(v);
  let Y = (v) => d3.scale.pow().domain(yRange).range([height, 0])(Math.abs(v));
  let R = (v) =>  3 + d3.scale.sqrt().domain(yRange).range([1,13])(Math.abs(v));
  let Color = (v) => d3.scale.linear().domain([-xRangeMax,xRangeMax]).range(['#f80', '#08f'])(v);

  return {
    c: Color,
    x: X,
    y: Y,
    r: R,

    xRange: xRange,
    xRangeMax: xRangeMax,
    yRange: yRange,
    mean: Mean,
    dev: Dev
  }
};

const axis =
  [{
    icon: 'sentiment_dissatisfied',
    x: -1
  },{
    icon: 'sentiment_satisfied',
    x: 1
  }];

const metrics = (d,m) => {
  let mean = m.x(m.mean);
  let dev = Math.sqrt(m.x(m.dev))*2;
  return [{
    x: mean,
    y1: -50,
    y2: height+70,
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

function plot(d,m) {
  return d.map((val) => ({
    c: m.c(val[0]),
    x: m.x(val[0]),
    y: m.y(val[1]),
    r: m.r(val[1])
  }));
}

function transition(count) {
  d3.select('.plot-data').selectAll('circle')
    .transition()
    .delay((d,i) => (i * 33 + (count - i)))
    .duration(420)
    .each((d,i) => {
      if(i === count-1) {

        d3.select('.plot-metrics').selectAll('line')
          .transition()
          .duration(700)
          .attr('x1', (d) => d.x)
          .attr('x2', (d) => d.x)
          .style('opacity', .7);

        d3.select('.plot-axis').selectAll('text')
          .transition()
          .duration(300)
          .style('opacity', .7);

      }
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
  let m = Map(d);

  svg.append('g')
    .attr('class', 'plot-data')
  .selectAll('circle')
    .data(plot(d,m))
    .enter().append('circle')
    .attr('cx', (d) => d.x)
    .attr('cy', (d,i) => height)
    .attr('r', 0)
    .style('fill', (d) => d.c)
    .style('opacity', .5)
    .on('mount', function() {
      transition(d.length);
    })
    .on('mouseenter', function(d) {
      d3.select(this).transition().duration(400)
        .attr('r',(d) => (d.r * 1.3))
        .style('opacity',.7);
    })
    .on('mouseout', function(d) {
      d3.select(this).transition().duration(300)
        .attr('r',(d) => d.r)
        .style('opacity',.5);
    });

  svg.append('g')
    .attr('class', 'plot-metrics')
  .selectAll('line')
    .data(metrics(d,m))
    .enter().append('line')
    .attr('y1', (d) => d.y1)
    .attr('y2', (d) => d.y2)
    .attr('x1', width/2)
    .attr('x2', width/2)
    .attr("stroke", "gray")
    .attr("stroke-width", 3)
    .attr('class', (d) => d.class)
    .style('opacity',0);

  let axisGroup = svg.append('g')
    .attr('class', 'plot-axis')
    .attr('width', width)
  .selectAll('text')
    .data(axis).enter();

  axisGroup.append('text')
    .text((d) => d.icon)
    .attr('y', height + 120)
    .attr('x', (d) => m.x(d.x * m.xRangeMax))
    .attr('font-family', 'Material Icons')
    .attr('font-size', '42px')
    .style("text-anchor", "middle")
    .style('fill', (d) => d3.rgb(m.c(d.x)).darker(1.3))
    .style('opacity', 0);

  axisGroup.append('g:text')
    .text((d) => (d.x ? `${d.x > 0 ? '+' : ''}${Math.round(d.x * m.xRangeMax * 100)}` : null))
    .attr('y', height + 70)
    .attr('x', (d) => m.x(d.x * m.xRangeMax))
    .attr('font-family', 'Varela Round')
    .attr('font-size', '19px')
    .style("text-anchor", "middle")
    .style('fill', (d) => d3.rgb(m.c(d.x)).darker(1.3))
    .style('opacity', 0);

  return svg[0][0];
};

export default createNode