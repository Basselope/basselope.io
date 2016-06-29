import d3 from 'd3'

const node = document.createElement('div');

  const w = 300;
  const h = 300;

  const outerRadius = w / 2;
  const innerRadius = 0;
  const arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const pie = d3.layout.pie();


  const color = d3.scale.category10();


  const svg = d3.select(node)
    .append('svg')
    .attr('width', w)
    .attr('height', h);

function createNode(...data) {
  let resolved = false;
  if(data)
    resolved = data.reduce((curr,val) => val || curr ? val.hasOwnProperty('trendingTopics') : false, true);
  if(!resolved)
    return null;


  let topics = data.reduce((curr,val) => [].concat(curr,val.trendingTopics), []).sort((a, b) => b[1] - a[1]).slice(0, 7);


  let angles = topics.map((val) => val[1]);

  const arcs = svg.selectAll('g.arc')
    .data(pie(angles))
    .enter().append('g')
    .attr('class', 'arc')
    .attr('transform', `translate(${outerRadius},${outerRadius})`);


  arcs.append('path')
    .attr('fill', (d,i) => color(i))
    .attr('d', arc)
    .style('opacity', .5);


  arcs.append('text')
    .attr('transform', (d) => `translate(${arc.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .text((d,i) => topics[i][0]);

  return svg[0][0];

}

export default createNode