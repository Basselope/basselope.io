'use strict';
const apiStruct = require('./utils/api/api_struct.js');
const api_call = require('./utils/api/api_call.js');
var twitterHandle = require('./utils/api/config/getTweets.js');
var bingHandle = require('./utils/api/config/getBing.js');
var redditHandle = require('./utils/api/config/getReddit.js');


function apihandlers(req, res, next) {
	console.log(req.url);
	switch(req.url) {
		case '/_api/twitter/search':
			// twitterHandle.getTweets(req, res, next)
			api_call("twitter", req.body.query).then(function(responce){ 
					res.status(200).send(responce.data)
			});
			break;
		case '/_api/bing/search':
			bingHandle.getBing(req, res, next);
      break;
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