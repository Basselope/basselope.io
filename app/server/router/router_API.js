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
			api_call('twitter', [req.body.query,'#'+req.body.query])
				.then((ret) => res.status(200).send(ret))
				.catch((err) => res.status(400).send(err));
			break;
    case '/_api/reddit/search':
      api_call('reddit', req.body.query)
        .then((ret) => res.status(200).send(ret))
        .catch((err) => res.status(400).send(err));
      break;
		case '/_api/bing/search':
			bingHandle.getBing(req, res, next);
      break;
		case '/_api/bing/suggestions':
			bingHandle.getBing(req,res,next);
			break;
	}
}

var exports = module.exports = {};
exports.routerHandler = apihandlers;