import d3 from 'd3'

function d3Pie () {
const node = document.createElement('div');

function getTopics (data){
  let topics = data.reduce((curr,val) => [].concat(curr,val.trendingTopics), []);
  let finalTopics = {};
  for(var key in topics){
    var x = topics[key];
    finalTopics[x[0]] = finalTopics[x[0]]?finalTopics[x[0]]+x[1]:x[1]
  }
  delete finalTopics['someone'];
  topics=[];

  for(var key in finalTopics){
    topics.push([key, finalTopics[key]])
  }
  console.log(`TOPICS BEFORE ${topics}`)
  topics =topics.sort((a, b) => b[1] - a[1]);
  console.log(`TOPICS AFTER ${topics}`)

  return topics
}
function checkLevinsteins(topics){
  for(var i = 0; i<topics.length; i++){
    for(var j = i+1; j<topics.length; j++){
      if(!topics[j] || !topics[i]) break;
      if(LevenshteinDistance(topics[i][0],topics[j][0])<3){
        topics[i][1] = topics[i][1]+topics[j][1];
        delete topics[j];
      }
    }
  }
  var tempArray = [];
  for(var key in topics)
    tempArray.push(topics[key]);
  return tempArray;
}
function LevenshteinDistance($s1, $s2) {
  $s1 = $s1.trim().toLowerCase();
  $s2 = $s2.trim().toLowerCase();
  var $sLeft = ($s1.length > $s1.length) ? $s1 : $s2;
  var $sRight = ($s1.length > $s1.length) ? $s2 : $s1;
  var $nLeftLength = $sLeft.length;
  var $nRightLength = $sRight.length;
  var $nsDistance, $nLeftPos, $nCost, $nDiagonal, $cLeft, $cRight, $nNewDiagonal, $nRightPos;
  if ($nLeftLength == 0)
    return $nRightLength;
  else if ($nRightLength == 0)
    return $nLeftLength;
  else if ($sLeft === $sRight)
    return 0;
  else if (($nLeftLength < $nRightLength) && ($sRight.indexOf($sLeft) !== -1))
    return $nRightLength - $nLeftLength;
  else if (($nRightLength < $nLeftLength) && ($sLeft.indexOf($sRight) !== -1))
    return $nLeftLength - $nRightLength;
  else {
    $nsDistance = Array.apply(null, Array($nRightLength + 1)).map(function(_, i) {
      return i + 1;
    });
    for ($nLeftPos = 1; $nLeftPos <= $nLeftLength; ++$nLeftPos) {
      $cLeft = $sLeft[$nLeftPos - 1];
      $nDiagonal = $nLeftPos - 1;
      $nsDistance[0] = $nLeftPos;
      for ($nRightPos = 1; $nRightPos <= $nRightLength; ++$nRightPos) {
        $cRight = $sRight[$nRightPos - 1];
        $nCost = ($cRight == $cLeft) ? 0 : 1;
        $nNewDiagonal = $nsDistance[$nRightPos];
        $nsDistance[$nRightPos] =
          Math.min($nsDistance[$nRightPos] + 1,
            $nsDistance[$nRightPos - 1] + 1,
            $nDiagonal + $nCost);
        $nDiagonal = $nNewDiagonal;
      }
    }
    return $nsDistance[$nRightLength];
  }
}
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
    // .classed("svg-container", true)
    .attr("preserveAspectRatio", "xMaxYMax meet")
    .attr("viewBox", "0 0 300 300")
    .style('overflow', 'visible')
    .style('max-width', '300px')
    .style('max-height', '300px');

    // .classed("svg-content-responsive", true);

function createNode(...data) {
  //console.log("DATA DATA DATA DATA DATA",data)

  let resolved = false;
  if(data)
    resolved = data.reduce((curr,val) => val || curr ? val.hasOwnProperty('trendingTopics') : false, true);
  if(!resolved)
    return null;
  let topics  = getTopics(data);
  topics = checkLevinsteins(topics).slice(0,5);



  //console.log("CHECK IT OUT",data, topics)
  let angles = topics.map((val) => val[1]);

  let that = this;
  const arcs = svg.selectAll('g.arc')
    .data(pie(angles))
    .enter().append('g')
    .attr('class', 'arc')
    .attr('transform', `translate(${outerRadius},${outerRadius})`)
    .on('click', function(d) {
      that.handleClick(d);
    });


  arcs.append('path')
    .attr('fill', (d,i) => color(i))
    .attr('d', arc)
    .style('opacity', .5);


  arcs.append('text')
    .text((d,i) => topics[i][1] + ' references')
    .attr('transform', (d) => {
      let c = arc.centroid(d);
      return `translate(${2.8*c[0]}, ${2.3*c[1]})`;
    })
    .attr('text-anchor', 'middle')

    .attr('font-family', 'Varela Round')
    .attr('font-size', '14px');

  arcs.append('text')
    .text((d,i) => topics[i][0])
    .attr('transform', (d) => {
      let c = arc.centroid(d);
      return `translate(${1.5*c[0]}, ${1.5*c[1]})`;
    })
    .attr('text-anchor', 'middle')
    .attr('font-family', 'Varela Round')
    .attr('font-size', '16px');

    // .attr("transform", function(d) { //set the label's origin to the center of the arc
    //   //we have to make sure to set these before calling arc.centroid
    //   console.log(d)
    //   d.outerRadius = outerRadius + 50; // Set Outer Coordinate
    //   d.innerRadius = outerRadius + 45; // Set Inner Coordinate
    //   return "translate(" + arc.centroid(d) +")";
    // }).attr("text-anchor", function(d) {
    //   // are we past the center?
    //   return (d.endAngle + d.startAngle)/2 > Math.PI ?
    //     "end" : "start";
    // })
    // .text((d,i) => topics[i][0]);

  return svg[0][0];

}
  return createNode;
}

export default d3Pie