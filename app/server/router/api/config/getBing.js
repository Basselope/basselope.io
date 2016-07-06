var https = require('https');
var btoa = require('btoa');
var Bing = require('node-bing-api')({ accKey: "esEia2AIhxzceWcPPqFRajpP1TjNYYc4Ndw4KjSqANg"});//({ accKey: "4028678ab534476ead5c943f8dcecad2"});

var bingHandler = function() {

    function getBingSuggestion(req,res,next){
      let value = req.body.query.split(" ").join("%20");
      return https.get({
        host: 'api.bing.com',
        path: '/osjson.aspx?query='+value
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var parsed = JSON.parse(data);
            res.send(JSON.parse(data));
        });
    });


    }
    return {
        run: getBingSuggestion
    }
};

var exports = module.exports = {};
exports.getBing = bingHandler().run;