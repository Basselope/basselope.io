import d3 from 'd3'
import _ from 'lodash'

const node = document.createElement('div');
const width = 700,
      height = 300;

const svg = d3.select(node).append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('overflow', 'visible');

const nest = (content) => {
  // creates a key from content.created_at object 'YYYYMMDD'
  let timeKey = (v) =>
    Number(`${v.created_at.years}${('0' + v.created_at.months).slice(-2)}${('0' + v.created_at.date).slice(-2)}`);
  return d3.nest()
    .key((d) => timeKey(d))
    .sortKeys(d3.ascending)
    .entries(content)
    .reduce((curr,d) => {
      // if(d.values.length < 4)
      //   return curr;
      return [].concat(curr, { key: d.key,
        values: d.values.reduce((curr, v, i) => {
          let pushVal = (nest, val) => {
            curr[nest].t += val;
            curr[nest].avg = curr[nest].t / (i + 1);
            curr[nest].values.push({ content: v, value: val });
          };

          let s = v.sentiment;
          let value = ( s.score * s.comparative ) / ( s.words.length * 5 );
          s.comparative < 0 ? pushVal('negative', -value) : pushVal('positive', value);

          return curr;
        },{ negative:{ values:[], avg:0, t:0}, positive:{ values:[], avg:0, t:0} })
      });
    },[]);
};

const Map = (content) => {

  let d = nest(content);

  let xRange = d3.extent(d,(val) => Number(val.key));

  let yMax = d3.max(d,(val) => val.values.positive.avg);
  let yMin = d3.min(d,(val) => val.values.negative.avg);
  let yRangeMax = Math.max(Math.abs(yMin),yMax);

  let Maxim = d.reduce((curr,val,i) => {
    let pos = val.values.positive.avg;
    let neg = val.values.negative.avg;
    curr.positive = (curr.positive === null && pos === yMax) ? i : curr.positive;
    curr.negative = (curr.negative === null && neg === yMin) ? i : curr.negative;
    return curr;
  }, {positive: null, negative: null});

  let Y = (v) => d3.scale.linear().domain([-yRangeMax,yRangeMax]).range([height, 0])(v);
  // let X = (v) => d3.scale.linear().domain(xRange).range([0, width])(v);
  let X = (v) => d3.scale.linear().domain([0,d.length-1]).range([0, width])(v);

  let Area = d3.svg.area()
    .x((d,i) => X(i))
    .y0((d,i) => Y(d.values.negative.avg))
    .y1((d,i) => Y(d.values.positive.avg))
    .interpolate('cardinal')(d);

  // let Mean = d3.mean(d,(val) => val[0]);
  // let Dev = d3.deviation(d,(val) => val[0]);

  // let R = (v) =>  3 + d3.scale.sqrt().domain(yRange).range([1,13])(Math.abs(v));
  // let Color = (v) => d3.scale.linear().domain([-xRangeMax,xRangeMax]).range(['#f80', '#08f'])(v);

  return {
    d: d,

    // c: Color,
    // r: R,
    x: X,
    y: Y,

    area: Area,
    maxim: Maxim,

    xRange: xRange,
    yRange: [yMin,yMax],
    yRangeMax: yRangeMax
    // mean: Mean,
    // dev: Dev
  }
};

const markers = (m) => {

  return [{
    x1: 0-33,
    x2: width+33,
    y: m.yRange[0],
    class: 'time-min'
  },{
    x1: 0-100,
    x2: width+100,
    y: 0,
    class: 'time-zero'
  },{
    x1: 0-33,
    x2: width+33,
    y: m.yRange[1],
    class: 'time-max'
  }]
};

// function transition(count) {
//   d3.select('.plot-data').selectAll('circle')
//     .transition()
//     .delay((d,i) => (i * 33 + (count - i)))
//     .duration(420)
//     .each((d,i) => {
//       if(i === count-1) {
//
//         d3.select('.plot-metrics').selectAll('line')
//           .transition()
//           .duration(700)
//           .attr('x1', (d) => d.x)
//           .attr('x2', (d) => d.x)
//           .style('opacity', .9);
//
//         d3.select('.plot-metrics').selectAll('text')
//           .transition()
//           .duration(700)
//           .attr('x', (d) => d.x)
//           .style('opacity', .9);
//
//         d3.select('.plot-axis').selectAll('text')
//           .transition()
//           .duration(300)
//           .style('opacity', .7);
//
//       }
//     })
//     .attr('r', (d) => d.r)
//     .attr('cy', (d) => d.y);
// }

const append = {
  data: (timeLine,m) => {
    let timeData = timeLine.append('g').attr('class','time-data');

    return timeData.append('path')
      .attr('d', m.area)
      .attr('fill', 'url(#gradient)')
      .style('opacity', 'url(#opacity)');
  },
  markers: (timeLine,m) => {
    let timeMarkers = timeLine.append('svg:g');

    let markerGroups = timeMarkers.selectAll()
      .data(markers(m)).enter()
      .append('g').attr('class',(d) => d.class);

    markerGroups.append('line')
      .attr('x1', (d) => d.x1)
      .attr('x2', (d) => d.x2)
      .attr('y1', (d) => m.y(d.y))
      .attr('y2', (d) => m.y(d.y))
      .attr('class',(d) => d.class)
      .attr('stroke', '#000')
      .attr('stroke-width', 3)
      .style('opacity', .3);

    timeMarkers.append('line')
      .attr('x1', m.x(m.maxim.negative))
      .attr('x2', m.x(m.maxim.negative))
      .attr('y1', m.y(0))
      .attr('y2', m.y(m.yRange[0]) + 33)
      .attr('stroke', '#000')
      .attr('stroke-width', 5)
      .style('opacity', .3);

    timeMarkers.append('line')
      .attr('x1', m.x(m.maxim.positive))
      .attr('x2', m.x(m.maxim.positive))
      .attr('y1', m.y(0))
      .attr('y2', m.y(m.yRange[1]) - 33)
      .attr('stroke', '#000')
      .attr('stroke-width', 5)
      .style('opacity', .3);

  },
  gradient: (svg) => {
    let opacity = svg.append("svg:defs")
      .append("svg:linearGradient")
      .attr("id", "opacity")
      .attr("x1", "0%")
      .attr("y1", "100%")
      .attr("x2", "100%")
      .attr("y2", "100%")
      .attr("spreadMethod", "pad");

    opacity.append("svg:stop")
      .attr("offset", "0%")
      // .attr("stop-color", "#000")
      .attr("stop-opacity", 0);

    opacity.append("svg:stop")
      .attr("offset", "10%")
      // .attr("stop-color", "#fff")
      .attr("stop-opacity", 1);

    opacity.append("svg:stop")
      .attr("offset", "90%")
      // .attr("stop-color", "#fff")
      .attr("stop-opacity", 1);

    opacity.append("svg:stop")
      .attr("offset", "100%")
      // .attr("stop-color", "#000")
      .attr("stop-opacity", 0);

    let gradient = svg.append("svg:defs")
      .append("svg:linearGradient")
      .attr("id", "gradient")
      .attr("x1", "100%")
      .attr("y1", "100%")
      .attr("x2", "100%")
      .attr("y2", "0%")
      .attr("spreadMethod", "pad")
      .attr('gradientUnits', 'userSpaceOnUse');

    gradient.append("svg:stop")
      .attr("offset", "0%")
      .attr("stop-color", "#f80")
      .attr("stop-opacity", 1);

    gradient.append("svg:stop")
      .attr("offset", "100%")
      .attr("stop-color", "#08f")
      .attr("stop-opacity", 1);
  }
};

const createNode = function(...data) {
  let resolved = false;
  if(data)
    resolved = data.reduce((curr,val) => val || curr ? val.hasOwnProperty('data') : false, true);
  if(!resolved)
    return null;

  // create array of all 'content' from data input
  let content = data.reduce((curr,val) => [].concat(curr, _.reduce(val.data,(curr,val) =>
    [].concat(curr,val.content || []),[])), []);


  let m = Map(content);
  let timeLine = svg.append('g').attr('class', 'time-line');

  append.gradient(svg);

  append.data(timeLine,m);
  append.markers(timeLine,m);



  return svg[0][0];
};

export default createNode