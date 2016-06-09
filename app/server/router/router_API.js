var twitterHandle = require('../../../app/public/js/views/getTweets.js');
var bingHandle = require('../../../app/public/js/views/getBing.js');

function apihandlers(req,res,next){
	console.log(req.url);
	switch(req.url){
		case '/_api/twitter/search':
			req.body.query = "israel";
			twitterHandle.getTweets(req, res, next)
		case '/_api/bing/search':
			bingHandle.getBing(req,res,next);

	}		
}





var exports = module.exports = {};
exports.routerHandler = apihandlers;


