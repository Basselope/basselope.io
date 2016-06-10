var https = require('https');
var auth = require('./oauth.json');
var sentimentAnalysis = require('./../../../data/utils/sentimentAnalysis.js');



var twitterHandler = function() {
    var headers = {
        'User-Agent': 'Coding Defined',
        Authorization: 'Bearer ' + auth.access_token
    };

    function callTwitter(options, callback) {
        https.get(options, function(response) {
            jsonHandler(response, callback);
        }).on('error', function(e) {
            console.log('Error : ' + e.message);
        })
    };
  
    var tweetDetails = {
        maxresults: 100,
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
        fullTweetPath(req.body.query.replace("#",""));
        callTwitter(tweetDetails.options, function(nonHashTag) {
            let noHash = nonHashTag;
            fullTweetPath("#"+req.body.query.replace("#",""));
             callTwitter(tweetDetails.options, function(HashTagTweets) {
            let tweetsReturn = HashTagTweets.statuses.concat(noHash.statuses).map(function(curr,index,arr){
                return {
                  type:"twitter",
                  date:curr.created_at,
                  text:curr.text,
                  user: curr.user.screen_name,
                  userObject: curr.user,
                  retweetCount: curr.retweet_count,
                  favorited: curr.favorite_count
                };
            });
        let analyzedTweets = sentimentAnalysis.sentimentProps.runTwit(tweetsReturn)
        res.status(200).send(analyzedTweets);
            });
        });
    };

  return { run: getTweetList }
};

var exports = module.exports = {};
exports.getTweets = twitterHandler().run;