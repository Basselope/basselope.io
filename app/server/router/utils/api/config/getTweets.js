var https = require('https');
var auth = require('./oauth.json');

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
    var trendOptions = {
        host: 'api.twitter.com',
        path: '/1.1/trends/place.json?id=1', // id = 1 for global trends CALL getLocationIds to get location
        headers: headers
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
        fullTweetPath(req.body.query);
        callTwitter(tweetDetails.options, function(tweetObj) {
            var tweetsReturn = tweetObj.statuses.map(function(curr,index,arr){
                return {
                  date:curr.created_at,
                  tweet:curr.text,
                  user: curr.user.screen_name,
                  userObject: curr.user,
                  retweetCount: curr.retweet_count,
                  favorited: curr.favorite_count
                };
            });

        res.status(200).send(tweetsReturn);

        });
    };

  return { run: getTweetList }
};

var exports = module.exports = {};
exports.getTweets = twitterHandler().run;