import d3 from 'd3'

const node = document.createElement('div');

const width = 700,
      height = 300;

function d3Time() {

  function prefix_postfix(dataContent) {
    dataContent.sort(function(a, b) {
      return a.dateFormat - b.dateFormat;
    });
    var lower = {
      dateOrig: dataContent[0].dateOrig, //years+"-"+data[0].created_at.months+"-"+data[0].created_at.date,
      dateFormat: dataContent[0].dateFormat - 1,
      avgScore: 0,
      positiveSentiments: 0,
      negativeSentiments: 0
    };
    var top = {
      dateOrig: dataContent[0].dateOrig, //years+"-"+data[0].created_at.months+"-"+data[0].created_at.date,
      dateFormat: dataContent[dataContent.length - 1].dateFormat + 1,
      avgScore: 0,
      positiveSentiments: 0,
      negativeSentiments: 0
    };
    dataContent.unshift(lower);
    dataContent.push(top);
  }

  function formatDate(unformated) {
    let theDate = unformated.years + "" + ('0' + unformated.months).slice(-2) + "" + ('0' + unformated.date).slice(-2);
    return Number(theDate); //theDate.getYear() + "" + (theDate.getMonth() + 1) + "" + (theDate.getDay() + 1) + "" + theDate.getHours()
  }

  function posNegFilter(data) {
    let positiveData = [];
    let negativeData = [];
    for (var key in data) {
      let curr = data[key];
      let temp = {
        dateOrig: curr.dateOrig,
        dateFormat: curr.dateFormat,
        avgScore: 0,
        positiveSentiments: curr.positiveSentiments,
        negativeSentiments: curr.negativeSentiments
      };
      if (curr.avgScore < 0) {
        negativeData.push(curr);
        positiveData.push(temp);
      }
      else if (curr.avgScore > 0) {
        positiveData.push(curr);
        negativeData.push(temp);
      } else {
        positiveData.push(temp);
        negativeData.push(temp);
      }
    }
    return {
      positive: positiveData,
      negative: negativeData
    }
  }

  function combineData(dataSet) {
    let newObject = {};
    let newObjectCount = {};
    for (var key in dataSet) {
      var current = dataSet[key];
      if (!newObject[current.dateFormat]) {
        newObject[current.dateFormat] = current
      } else {
        newObject[current.dateFormat] = {
          dateOrig: current.dateOrig,
          dateFormat: current.dateFormat,
          avgScore: newObject[current.dateFormat].avgScore + current.avgScore,
          positiveSentiments: newObject[current.dateFormat].positiveSentiments + current.positiveSentiments,
          negativeSentiments: newObject[current.dateFormat].negativeSentiments + current.negativeSentiments
        }
      }
      newObjectCount[current.dateFormat] = (newObjectCount[current.dateFormat] ? newObjectCount[current.dateFormat] + 1 : 1)
    }
    var data = [];
    for (var key in newObject) {
      newObject[key].avgScore = newObject[key].avgScore / newObjectCount[key]
      data.push(newObject[key])
    }
    return data;
  }

  function parseData(passedData) {
    let data = [];
    // let dataObject = {};
    // let ranges = {}
    for (var dataSources in passedData) {
      let d = passedData[dataSources].data
      for (var postKey in d) {
        let content = d[postKey].content;
        for (var contentKey in content) {
          var sentimentScore = content[contentKey].sentiment.score;
          var formattedDate = (formatDate(content[contentKey].created_at));
          var temp = {
            dateOrig: content[contentKey].created_at, //content[contentKey].created_at.years + "-" + content[contentKey].created_at.months + "-" + content[contentKey].created_at.date,
            dateFormat: formattedDate,
            avgScore: content[contentKey].sentiment.score,
            positiveSentiments: content[contentKey].sentiment.positive.length,
            negativeSentiments: content[contentKey].sentiment.negative.length
          };
          data.push(temp);
        }
      }
    }
    return data;
  }

  const svg = d3.select(node).append("svg")
    .attr("width", width)
    .attr("height", height)
    .style('overflow', 'visible');

  const createNode = function(...data) {

    let resolved = false;
    if (data)
      resolved = data.reduce((curr, val) => curr ? val.hasOwnProperty('set') : false, true);
    if (!resolved)
      return null; // = passedData.reduce((curr,val) => [].concat(curr,val.data), []);


    let d3Data = parseData(data);
    let seperatedData = posNegFilter(d3Data);
    let positiveData = combineData(seperatedData.positive);
    let negativeData = combineData(seperatedData.negative);
    console.log(seperatedData);

    // let yMin = Math.min.apply(Math, negativeData.map(function(o) {
    //   return o.avgScore;
    // })); // (negativeData[1].avgScore)
    // let yMax = Math.max.apply(Math, positiveData.map(function(o) {
    //   return o.avgScore;
    // })); // (positiveData[positiveData.length-2].avgScore)

    let yMin = d3.min(negativeData,(d) => d.avgScore);
    let yMax = d3.max(positiveData,(d) => d.avgScore);

    console.log("POSITIVEDATA", positiveData, seperatedData.positive);
    console.log("NEGATIVEDATA", negativeData, seperatedData.negative);

    // var m = [80, 80, 80, 80];
    var w = 600;
    var h = 300;

    let yMaxRange = Math.max(Math.abs(yMin), yMax);

    // const color = d3.scale.linear().domain([ranges.yMin, ranges.yMax]).range(['#f80', '#08f']);
    var x = d3.scale.linear().domain([0, positiveData.length]).range([0, w]);
    var y = d3.scale.linear().domain([-yMaxRange, yMaxRange]).range([h, 0]);


    // var line = d3.svg.line()
    //   .x(function(d, i) {
    //     return x(i); //TODO: Here it only iterates on index, not date. s
    //   })
    //   .y(function(d) {
    //     return y(d.avgScore);
    //   }).interpolate("basis");

    let tics = Math.max(positiveData.length,negativeData.length);

    let max = d3.svg.line()
      .x((d,i) => x(i))
      .y(y(yMax))(Array(tics));

    let min = d3.svg.line()
      .x((d,i) => x(i))
      .y(y(yMin))(Array(tics));

    let area = d3.svg.area()
      .x((d,i) => x(i))
      .y0((d,i) => y(negativeData[i].avgScore))
      .y1((d,i) => y(positiveData[i].avgScore))
      .interpolate('cardinal')(Array(tics));

    console.log('min&max of y',yMin,yMax);
    console.log('neg&pos of time', negativeData,positiveData);

    // let path = area(positiveData); //line(positiveData) + line(negativeData);

    var gradient = svg.append("svg:defs")
      .append("svg:linearGradient")
      .attr("id", "gradient")
      .attr("x1", "100%")
      .attr("y1", "100%")
      .attr("x2", "100%")
      .attr("y2", "0%")
      .attr("spreadMethod", "pad")
      .attr('gradientUnits', 'userSpaceOnUse');

// Define the gradient colors
    gradient.append("svg:stop")
      .attr("offset", "0%")
      .attr("stop-color", "#f80")
      .attr("stop-opacity", 1);

    gradient.append("svg:stop")
      .attr("offset", "100%")
      .attr("stop-color", "#08f")
      .attr("stop-opacity", 1);

    let graph = svg.append('g').attr('class', 'time-line');

    graph.append('path')
      .attr('d', area)
      .attr('fill', 'url(#gradient)');

    graph.append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', y(yMax))
      .attr('y2', y(yMax))
      .attr('stroke', '#333')
      .attr('stroke-width', 2)
      .style('opacity', .5);

    graph.append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', y(yMin))
      .attr('y2', y(yMin))
      .attr('stroke', '#333')
      .attr('stroke-width', 2)
      .style('opacity', .5);
    // svg.select('g.time-line').append


    // svg.append("path").attr("d", line(positiveData))
    //   .style('fill', 'url(#gradient');
    // svg.append("path").attr("d", line(negativeData))
    //   .style('fill', 'url(#gradient');
    return svg[0][0];
  };
  return {
    createNode: createNode
  }
}
export default d3Time().createNode;