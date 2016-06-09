var https = require('https');
var btoa = require('btoa');
var Bing = require('node-bing-api')({ accKey: "esEia2AIhxzceWcPPqFRajpP1TjNYYc4Ndw4KjSqANg"});//({ accKey: "4028678ab534476ead5c943f8dcecad2"});

var bingHandler = function() {

    function getBingList(req,res,next){
        //console.log(req.body);
        //console.log(Bing);
        //req.body.query
        
Bing.web("leo fender", function(error, res, body){
    console.log(body);
  },
  {
    top: 50,
    market: 'en-US'
  });

    }
    return {
        run: getBingList
    }
};

var exports = module.exports = {};
exports.getBing = bingHandler().run;