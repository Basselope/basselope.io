const twitterHandle = require('./utils/twitter/getTweets.js');
const bingHandle = require('./utils/getBing.js');
const redditHandle = require('./utils/getReddit.js');
const apiStruct = require('./utils/api_struct.js');

function apihandlers(req, res, next) {
	console.log(req.url);
	switch(req.url) {
		case '/_api/twitter/search':
			twitterHandle.getTweets(req, res, next)
			.then(function(data){ 
					res.status(200).send(data)
			});
			break;
		case '/_api/bing/search':
			bingHandle.getBing(req, res, next);
		case '/_api/bing/suggestions':
			bingHandle.getBing(req,res,next);
			break;
    	case '/_api/reddit/search':
      		redditHandle.redditHandler(req, res, next);
      		break;
	}
}





var exports = module.exports = {};
exports.routerHandler = apihandlers;