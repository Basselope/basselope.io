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
function tempObject(copyMe){
  let temp = {};
  for(var key in copyMe){
      temp[key] = copyMe[key];
  }
  return temp;

}


function formatDate(unformated) {
    let theDate = unformated.years+""+('0' + unformated.months).slice(-2)+""+('0' + unformated.date).slice(-2);
    return Number(theDate);//theDate.getYear() + "" + (theDate.getMonth() + 1) + "" + (theDate.getDay() + 1) + "" + theDate.getHours()
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
        xMin: 9999999999999,
        xMax: 0,
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
                var formattedDate = (formatDate(content[contentKey].created_at));
                ranges.yMin = sentimentScore < ranges.yMin ? sentimentScore : ranges.yMin
                ranges.yMax = sentimentScore > ranges.yMax ? sentimentScore : ranges.yMax
                ranges.xMin = formattedDate < ranges.xMin ? formattedDate : ranges.xMin
                ranges.xMax = formattedDate > ranges.xMax ? formattedDate : ranges.xMax
                var temp = {
                    dateOrig: content[contentKey].created_at,//.year+"-"+content[contentKey].created_at.month+"-"+content[contentKey].created_at.date,
                    dateFormat: formattedDate,
                    avgScore: content[contentKey].sentiment.score,
                    positiveSentiments: content[contentKey].sentiment.positive.length,
                    negativeSentiments: content[contentKey].sentiment.negative.length
                }
                data.push(temp);

            }
        }
    }
    const color = d3.scale.linear()
      .range(['#f80', '#08f'])
      .domain([-10, 10]); 
    data.sort(function(a,b){
      return a.dateFormat-b.dateFormat;
    });


     var lower = {
                    dateOrig: data[0].dateOrig,//.year+"-"+content[contentKey].created_at.month+"-"+content[contentKey].created_at.date,
                    dateFormat: data[0].dateFormat-1,
                    avgScore: 0,
                    positiveSentiments: 0,
                    negativeSentiments: 0
                }

   var top = {
                    dateOrig: data[data.length-1].dateOrig,//.year+"-"+content[contentKey].created_at.month+"-"+content[contentKey].created_at.date,
                    dateFormat: data[data.length-1].dateFormat+1,
                    avgScore: 0,
                    positiveSentiments: 0,
                    negativeSentiments:0
                }
data.unshift(lower);
data.push(top);

function posNegFilter(data){
  let positiveData=[];
  let negativeData=[];
  for(var i = 0; i<data.length; i++){
    let curr = data[i];
    let temp = {dateOrig: curr.created_at,//.year+"-"+content[contentKey].created_at.month+"-"+content[contentKey].created_at.date,
                    dateFormat: curr.dateFormat,
                    avgScore: 0,
                    positiveSentiments: curr.positiveSentiments,
                    negativeSentiments: curr.negativeSentiments}
    if(curr.avgScore<0){
      negativeData.push(curr)
      positiveData.push(temp)
    }
    if(curr.avgScore>0){
      positiveData.push(curr)
      negativeData.push(temp)
    }
    else{
      positiveData.push(temp);
      negativeData.push(temp)
    }

  }

  return {positive:positiveData, negative:negativeData}
}

    let seperatedData = posNegFilter(data);
    let positiveData =combineData(seperatedData.positive);
    let negativeData =combineData(seperatedData.negative);
    // let other = []
    // let positiveData = data.filter(function(curr){
    //   if(curr.avgScore<=0){
    //       //var newObject = curr.
    //       other.push(curr);
    //   }
    //   return curr.avgScore>0;
    // });
    // positiveData.concat(other);
    
    // let negativeData = data.filter(function(curr){
    //   return curr.avgScore<0;
    // });
    console.log("POSITIVEDATA",positiveData, seperatedData.positive)
    console.log("NEGATIVEDATA",negativeData, seperatedData.negative)

    function combineData(dataSet){

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
                  //negAvgScore: current.avgScore<0?current.avgScore+newObject[current.dateFormat].negAvgScore
                  ///posAvgScore: current.avgScore<0?current.avgScore+newObject[current.dateFormat].posAvgScore
                  avgScore: newObject[current.dateFormat].avgScore + current.avgScore,
                  positiveSentiments: newObject[current.dateFormat].positiveSentiments + current.positiveSentiments,
                  negativeSentiments: newObject[current.dateFormat].negativeSentiments + current.positiveSentiments
              }
          }

          newObjectCount[current.dateFormat] = (newObjectCount[current.dateFormat] ? newObjectCount[current.dateFormat] + 1 : 1)
          //console.log(current.dateFormat,"==",newObjectCount[current.dateFormat], "SCORE",current.avgScore)
      }



      data=[];
      for (var key in newObject) {
          newObject[key].avgScore = newObject[key].avgScore / newObjectCount[key]
          data.push(newObject[key])
      }
      return data;
    }
    
    // data.map(function(curr, index, arr){

    // })
    //data = newObject; //newObject.sort(function(a,b){return a.dateFormat < b.dateFormat})
    //debugger;
     

    //console.log("POSITIVE", positiveData);
    //console.log("NEGATIVE", negativeData);
    var m = [80, 80, 80, 80]; // margins
    var w = 600; // width
    var h = 300; // height
    //((curr,val) => [].concat(curr,val.set), []);
    //X WIDTH RANGE    //TIGHENTS THE SPREAD

    console.log("RANGES", ranges)
    var x = d3.scale.linear().domain([0, positiveData.length]).range([0, w]);
    // Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
    var y = d3.scale.linear().domain([-10, 10]).range([h,0]); //function return
    // automatically determining max range can work something like this
    // var y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);
    // create a line function that can convert data[] into x and y points

    var line = d3.svg.line()
        // assign the X function to plot our line as we wish
        .x(function(d, i) {

            // verbose logging to show what's actually being done
            console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(d) + ' using our xScale.');
            return x(i);//x(Number(d.dateFormat));
        })
        .y(function(d) {
            // verbose logging to show what's actually being done
            console.log('Plotting Y value for data point: ' + d.avgScore + ' to be at: ' + y(d.avgScore) + " using our yScale.");
            // return the Y coordinate where we want to plot this datapoint
            return y(d.avgScore);

        }).interpolate("monotone")
    svg.append("path").attr("d", line(positiveData))
    .style("fill","#000000")
    .style("stroke-width",2)
    .style("stroke","#000000");
    svg.append("path").attr("d", line(negativeData)).style("fill","#FFC400").style("stroke-width",2).style("stroke","#FFC400");
    console.log(svg);
    return svg[0][0];
}

export default createNode