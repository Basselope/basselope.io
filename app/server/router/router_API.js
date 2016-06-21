'use strict';
const apiStruct = require('./utils/api/api_struct.js');
const api_fetch = require('./utils/api/api_fetch.js');
var bingHandle = require('./utils/api/config/getBing.js');
const loginHandler = require('../data/utils/signup_in.js');

module.exports = function(req, res, next) {
	if(req.method === 'GET')
		next();
	switch(req.url) {
		case '/_api/twitter/search':
			api_fetch('twitter', [req.body.query,'#'+req.body.query])
				.then((ret) => res.status(200).send(ret))
				.catch((err) => res.status(400).send(err));
			break;
		case '/login':

			loginHandler.signIn(req,res, next); 
			console.log("IN LOGIN", req.body);
			// api_fetch('twitter', [req.body.query,'#'+req.body.query])
			// 	.then((ret) => res.status(200).send(ret))
			// 	.catch((err) => res.status(400).send(err));
			break;
    case '/_api/reddit/search':
      api_fetch('reddit', req.body.query)
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
