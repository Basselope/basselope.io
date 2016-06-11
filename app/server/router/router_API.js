var twitterHandle = require('./utils/twitter/getTweets.js');
var bingHandle = require('./utils/getBing.js');
var redditHandle = require('./utils/getReddit.js');

function apihandlers(req, res, next) {
	console.log(req.url);
	switch(req.url) {
		case '/_api/twitter/search':
			twitterHandle.getTweets(req, res, next);
			break;
		case '/_api/bing/search':
			bingHandle.getBing(req, res, next);
		case '/_api/bing/suggestions':
			bingHandle.getBing(req,res,next);
			break;
    	case '/_api/reddit/search':
      	redditHandler(req, res, next);
      		break;
	}
}





var exports = module.exports = {};
exports.routerHandler = apihandlers;