import d3 from 'd3'

const node = document.createElement('div');

function d3Time() {

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
                    negativeSentiments: newObject[current.dateFormat].negativeSentiments + current.positiveSentiments
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
        }
        var top = {
            dateOrig: dataContent[0].dateOrig, //years+"-"+data[0].created_at.months+"-"+data[0].created_at.date,
            dateFormat: dataContent[dataContent.length - 1].dateFormat + 1,
            avgScore: 0,
            positiveSentiments: 0,
            negativeSentiments: 0
        }
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
            }
            if (curr.avgScore < 0) {
                negativeData.push(curr)
                positiveData.push(temp)
            }
            else if (curr.avgScore > 0) {
                positiveData.push(curr)
                negativeData.push(temp)
            } else {
                positiveData.push(temp);
                negativeData.push(temp)
            }
        }
        return {
            positive: positiveData,
            negative: negativeData
        }
    }

    // function copyObject(copyMe) {
    //     let temp = {};
    //     for (var key in copyMe) {
    //         temp[key] = copyMe[key];
    //     }
    //     return temp;
    // }

    function formatDate(unformated) {
        let theDate = unformated.years + "" + ('0' + unformated.months).slice(-2) + "" + ('0' + unformated.date).slice(-2);
        return Number(theDate); //theDate.getYear() + "" + (theDate.getMonth() + 1) + "" + (theDate.getDay() + 1) + "" + theDate.getHours()
    }

    const color = d3.scale.linear().range(['#f80', '#08f']).domain([-10, 10]);

    var svg = d3.select(node).append("svg")
        .attr("width", 600)
        .attr("height", 300);

    const createNode = function(...passedData) {

        let resolved = false;
        if (passedData)
            resolved = passedData.reduce((curr, val) => curr ? val.hasOwnProperty('set') : false, true);
        if (!resolved)
            return document.createElement('div');; // = passedData.reduce((curr,val) => [].concat(curr,val.data), []);
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
                    }
                    data.push(temp);
                }
            }
        }

<<<<<<< 66cbf114e8c83759f9a53eb2478e06d5e4bbbc78:app/public/d3/d3Time.jsx

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

        console.log("RANGES", ranges)
        var x = d3.scale.linear().domain([0, positiveData.length]).range([0, w]);
        var y = d3.scale.linear().domain([ranges.yMin, ranges.yMax]).range([h, 0]);
        var line = d3.svg.line()
            .x(function(d, i) {
                //console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(d) + ' using our xScale.');
                return x(i); //TODO: Here it only iterates on index, not date. s
            })
            .y(function(d) {
                //console.log('Plotting Y value for data point: ' + d.avgScore + ' to be at: ' + y(d.avgScore) + " using our yScale.");
                return y(d.avgScore);

            }).interpolate("monotone")
        svg.append("path").attr("d", line(positiveData))
            .style("fill", "#000000")
            .style("stroke-width", 2)
            .style("stroke", "#000000");
        svg.append("path").attr("d", line(negativeData))
            .style("fill", "#FFC400")
            .style("stroke-width", 2)
            .style("stroke", "#FFC400");
        return svg[0][0];
    }
    return {
        createNode: createNode
    }
=======
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
    // console.log("POSITIVEDATA",positiveData, seperatedData.positive)
    // console.log("NEGATIVEDATA",negativeData, seperatedData.negative)

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
          // //console.log(current.dateFormat,"==",newObjectCount[current.dateFormat], "SCORE",current.avgScore)
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
     

    // //console.log("POSITIVE", positiveData);
    // //console.log("NEGATIVE", negativeData);
    var m = [80, 80, 80, 80]; // margins
    var w = 600; // width
    var h = 300; // height
    //((curr,val) => [].concat(curr,val.set), []);
    //X WIDTH RANGE    //TIGHENTS THE SPREAD

    // console.log("RANGES", ranges)
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
            // console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(d) + ' using our xScale.');
            return x(i);//x(Number(d.dateFormat));
        })
        .y(function(d) {
            // verbose logging to show what's actually being done
            // console.log('Plotting Y value for data point: ' + d.avgScore + ' to be at: ' + y(d.avgScore) + " using our yScale.");
            // return the Y coordinate where we want to plot this datapoint
            return y(d.avgScore);

        }).interpolate("monotone")
    svg.append("path").attr("d", line(positiveData))
    .style("fill","#000000")
    .style("stroke-width",2)
    .style("stroke","#000000");
    svg.append("path").attr("d", line(negativeData)).style("fill","#FFC400").style("stroke-width",2).style("stroke","#FFC400");
    // console.log(svg);
    return svg[0][0];
>>>>>>> [refactor/chore] code-cleanup and major restructuring to filesystem:app/public/jsx/views/d3/d3Time.jsx
}
export default d3Time().createNode