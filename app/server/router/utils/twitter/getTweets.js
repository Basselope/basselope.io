var https = require('https');
var auth = require('./oauth.json');
var co = require('co');
var sentimentAnalysis = require('./../../../data/utils/sentimentAnalysis.js');



var twitterHandler = function() {
    var headers = {
        'User-Agent': 'Coding Defined',
        Authorization: 'Bearer ' + auth.access_token
    };

    function callTwitter(options, prefix) {
        
        fullTweetPath(prefix);
        return new Promise(function(resolve, reject){
            https.get(options, function(response) {
                jsonHandler(response, resolve);
            }).on('error', function(error){
                reject(error);
            })
        })
   

    };
  
    var tweetDetails = {
        maxResult: 100,
        resultType: 'recent', // options are mixed, popular and recent
        options: {
            host: 'api.twitter.com',
            headers: headers,
        }
    };


    function jsonHandler(response, callback) {
        var json = '';
        response.setEncoding('utf8');
        if (response.statusCode === 200) {
            response.on('data', function(chunk) {
                json += chunk;
            }).on('end', function() {
                callback(JSON.parse(json));
            });
        } else {
            console.log('Error  : ' + response.statusCode);
        }
    };

    function fullTweetPath(query) {
        var path = '/1.1/search/tweets.json?q=' + query + '&count=' + tweetDetails.maxResult + '&include_entities=true&result_type=' + tweetDetails.resultType;
        tweetDetails.options.path = path;
    };

    function getTweetList(req, res, next) {
        console.log("HHHHHHHH",req.body.query)
        fullTweetPath(req.body.query.replace("#",""));
        let promise = new Promise(function(resolve, reject){
            fullTweetPath("#"+req.body.query.replace("#",""));
            (co.wrap(function* (){
                let resData = yield{
                    hashed: Promise.resolve(callTwitter(tweetDetails.options, req.body.query)),
                    nohash: Promise.resolve(callTwitter(tweetDetails.options, "#"+req.body.query))
                };
                resolve(resData.hashed.statuses.concat(resData.nohash.statuses));

            }))();//.then((returnVal)=> console.log(returnVal));
            
            // callTwitter(tweetDetails.options, function(HashTagTweets) {  
            //     let filteredTweets = apiStruct(HashTagTweets.statuses.concat(noHash.statuses), 'twitter');
            //     //let analyzedTweets = sentimentAnalysis.sentimentProps.runTwit(tweetsReturn)
            //     console.log(filteredTweets);
            //     //res.status(200).send(filteredTweets);
            //     });
            // fullTweetPath("#"+req.body.query.replace("#",""));
            // callTwitter(tweetDetails.options, function(nonHashTag) {
            //     let noHash = nonHashTag;
                
                 
            // });
        });
        return promise;
    };

  return { run: getTweetList }
};

var exports = module.exports = {};
exports.getTweets = twitterHandler().run;