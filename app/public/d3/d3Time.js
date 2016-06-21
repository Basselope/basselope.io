import d3 from 'd3'

const node = document.createElement('div');

const width = 600,
      height = 300; //define SVG space

const color = d3.scale.linear() //color gradient along the y coorddiante
  .range(['#f80', '#08f']); // '#f80', '#58b', '#08f', '#0f9'

const map = { //absolute placement for axis
  x: (d, x) => (width / 2) + (x * (width / 2 / Math.max(...d3.extent(d,(val) => val[0]).map((v) => Math.abs(v))))),
  y: (d, y) => height - ((height / d3.extent(d,(val) => val[1])[1]) * y),
  r: (r) => Math.min((r * .9) + 3, 22),
  c: (d, x) => color(map.x(d,x) / width)
};



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
};

function label(d) {

}

function plot(d) { //makes data in format d3 wants to make it useful for us
  // let xRange = d3.extent(d,(val) => val[0]); hands bcak array of 2 vals, lowest and highest for y in this case
  // let xSpread = width / 2 / Math.max(...Math.abs.apply(xRange));
  // let x = (x) => (width / 2) + (x * xSpread);
  //
  // let yRange = d3.extent(d,(val) => val[1]);
  // let ySpread = height / yRange[1];
  // let y = (y) => height - ySpread * y;
  //
  // let r = (r) => Math.min((r * .9) + 5, 22);
  //
  // let c = (c) => color(x(c) / width);

  return d.map((val) => ({
    c: map.c(d,val[0]),
    x: map.x(d,val[0]),
    y: map.y(d,val[1]),
    r: map.r(val[1]) //radius
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