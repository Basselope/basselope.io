import d3 from 'd3'

const node = document.createElement('div');


// function transition(count) {
//   d3.selectAll('circle')
//     .transition()
//     .delay((d,i) => (i * 33 + (count - i)))
//     .duration(420)
//     .each((d,i) => {
//       if(i === count-1)
//         d3.selectAll('line')
//           .transition()
//           .duration(700)
//           .attr('x1', (d) => d.x)
//           .attr('x2', (d) => d.x)
//           .style('opacity', .5);
//     })
//     .attr('r', (d) => d.r)
//     .attr('cy', (d) => d.y);
// }

function formatDate(unformated) {
    let theDate = new Date(unformated);
    return   (theDate.getMonth() + 1) + "" + (theDate.getDay() + 1) + "" + theDate.getHours()
}
var svg = d3.select(node).append("svg")
    .attr("width", 600)
    .attr("height", 300);

const createNode = function(...passedData) {
    let resolved = false;
    if (passedData)
        resolved = passedData.reduce((curr, val) => curr ? val.hasOwnProperty('set') : false, true);
    if (!resolved)
        return document.createElement('div');
    let d; // = passedData.reduce((curr,val) => [].concat(curr,val.data), []);

    let data = [];
    let dataObject = {};

    var ranges = {
        xMin: 99999,
        xMax: 10,
        yMin: -1,
        yMax: 10
    }
    for (var dataSources in passedData) {
        d = passedData[dataSources].data
        for (var postKey in d) {
            let curr = d[postKey];
            let content = curr.content;
            for (var contentKey in content) {
                var sentimentScore = content[contentKey].sentiment.score;
                var formattedDate = Number(formatDate(content[contentKey].created_at));
                ranges.yMin = sentimentScore < ranges.yMin ? sentimentScore : ranges.yMin
                ranges.yMax = sentimentScore > ranges.yMax ? sentimentScore : ranges.yMax
                ranges.xMin = formattedDate < ranges.xMin ? formattedDate : ranges.xMin
                ranges.xMax = formattedDate > ranges.xMax ? formattedDate : ranges.xMax
                var temp = {
                    dateOrig: content[contentKey].created_at,
                    dateFormat: formattedDate,
                    avgScore: content[contentKey].sentiment.score,
                    positiveSentiments: content[contentKey].sentiment.positive.length,
                    negativeSentiments: content[contentKey].sentiment.negative.length
                }

                data.push(temp);

            }
        }
    }

    let newObject = {};
    let newObjectCount = {};

    for (var key in data) {
        var current = data[key];
        if (!newObject[current.dateFormat]) {
            newObject[current.dateFormat] = current

        } else {
            newObject[current.dateFormat] = {
                dateOrig: current.dateOrig,
                dateFormat: current.dateFormat,
                avgScore: newObject[current.dateFormat].avgScore + current.avgScore,
                positiveSentiments: newObject[current.dateFormat].positiveSentiments + current.positiveSentiments,
                negativeSentiments: newObject[current.dateFormat].negativeSentiments + current.positiveSentiments
            }
        }

        newObjectCount[current.dateFormat] = (newObjectCount[current.dateFormat] ? newObjectCount[current.dateFormat] + 1 : 1)
        console.log(current.dateFormat,"==",newObjectCount[current.dateFormat], "SCORE",current.avgScore)
    }



    data=[];
    for (var key in newObject) {
        newObject[key].avgScore = newObject[key].avgScore / newObjectCount[key]
        data.push(newObject[key])
    }
    // data.map(function(curr, index, arr){

    // })
    //data = newObject; //newObject.sort(function(a,b){return a.dateFormat < b.dateFormat})

    console.log("DATA", data);
    var m = [80, 80, 80, 80]; // margins
    var w = 600; // width
    var h = 300; // height
    //((curr,val) => [].concat(curr,val.set), []);
    //X WIDTH RANGE    //TIGHENTS THE SPREAD

    console.log("RANGES", ranges)
    var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
    // Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
    var y = d3.scale.linear().domain([-10, 300]).range([h, 0]); //function return
    // automatically determining max range can work something like this
    // var y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);
    // create a line function that can convert data[] into x and y points
    var line = d3.svg.line()
        // assign the X function to plot our line as we wish
        .x(function(d, i) {

            // verbose logging to show what's actually being done
            console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(d) + ' using our xScale.');
            // return the X coordinate where we want to plot this datapoint
            //console.log(formatDate(d[0]));
            //return x(formatDate(d[0])); 
            return x(i);
        })
        .y(function(d) {
            // verbose logging to show what's actually being done
            console.log('Plotting Y value for data point: ' + d.positiveSentiments + ' to be at: ' + y(d.positiveSentiments) + " using our yScale.");
            // return the Y coordinate where we want to plot this datapoint
            return y(d.positiveSentiments);

        }).interpolate("monotone")
        //     // Add an SVG element with the desired dimensions and margin.

    //           //.attr("transform", "translate(" + m[3] + "," + m[0] + ")");
    //     // create yAxis
    //     var xAxis = d3.svg.axis().scale(x).tickSize(h).tickSubdivide(true);
    //     // Add the x-axis.
    //     graph.attr("class", "x axis")
    //           // .attr("transform", "translate(0," + h + ")")
    //           .call(xAxis);
    //     // create left yAxis
    //     var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");
    //     // Add the y-axis to the left
    //     graph.attr("class", "y axis")
    //           // .attr("transform", "translate(-25,0)")
    //           .call(yAxisLeft);

    //       // Add the line by appending an svg:path element with the data line we created above
    //     // do this AFTER the axes above so that the line is above the tick-lines
    //       graph.append("path").attr("d", line(data));
    // return graph[0][0];
    svg.append("path").attr("d", line(data));
    console.log(svg);
    return svg[0][0];
}

export default createNode