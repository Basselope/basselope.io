import d3 from 'd3'

const node = document.createElement('div');

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


  function formatDate(unformated) {
    let theDate = unformated.years + "" + ('0' + unformated.months).slice(-2) + "" + ('0' + unformated.date).slice(-2);
    return Number(theDate); //theDate.getYear() + "" + (theDate.getMonth() + 1) + "" + (theDate.getDay() + 1) + "" + theDate.getHours()
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


  var svg = d3.select(node).append("svg")
    .attr("width", 600)
    .attr("height", 300);

  const createNode = function(...passedData) {

    let resolved = false;
    if (passedData)
      resolved = passedData.reduce((curr, val) => curr ? val.hasOwnProperty('set') : false, true);
    if (!resolved)
      return null; // = passedData.reduce((curr,val) => [].concat(curr,val.data), []);
    let data = [];
    let dataObject = {};

    let ranges = {}
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
    prefix_postfix(data);
    let seperatedData = posNegFilter(data);
    let positiveData = combineData(seperatedData.positive);
    let negativeData = combineData(seperatedData.negative);

    ranges.yMin = Math.min.apply(Math, negativeData.map(function(o) {
      return o.avgScore;
    })); // (negativeData[1].avgScore)
    ranges.yMax = Math.max.apply(Math, positiveData.map(function(o) {
      return o.avgScore;
    })); // (positiveData[positiveData.length-2].avgScore)

    console.log("POSITIVEDATA", positiveData, seperatedData.positive);
    console.log("NEGATIVEDATA", negativeData, seperatedData.negative);
    //console.log(ranges)
    var m = [80, 80, 80, 80];
    var w = 600;
    var h = 300;
    console.log("RANGES", ranges);

    let yMaxRange = Math.max(Math.abs(ranges.yMin), ranges.yMax);
    const color = d3.scale.linear().domain([ranges.yMin, ranges.yMax]).range(['#f80', '#08f']);
    var x = d3.scale.linear().domain([0, positiveData.length]).range([0, w]);
    var y = d3.scale.linear().domain([-yMaxRange, yMaxRange]).range([h, 0]);
    var line = d3.svg.line()
      .x(function(d, i) {
        return x(i); //TODO: Here it only iterates on index, not date. s
      })
      .y(function(d) {
        return y(d.avgScore);
      }).interpolate("basis");

    let path = line(positiveData) + line(negativeData);

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

    svg.append('g').attr('fill', 'url(#gradient)')
      .append('path')
      .attr('d', path);
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