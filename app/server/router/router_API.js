'use strict';
const apiStruct = require('./api/api_struct.js');
const api_fetch = require('./api/api_fetch.js');
const bingHandle = require('./api/config/getBing.js');
const alchemyHandle = require('./api/config/getAlchemy.js');
const loginHandler = require('../data/utils/signup_in.js');
// const wiki  = require("wikijs");
const axios = require('axios');

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
			loginHandler.signIn(req, res, next); 
			
			
			
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
	 case '/_api/alchemy/search':
      alchemyHandle(req, res, next)
        .then((ret) => res.status(200).send(ret))
        .catch((err) => res.status(400).send(err));
      break;
	case '/_api/wiki/search':
 
 		api_fetch("wiki", req.body.query)
		 	.then((ret) => {
			  console.log("TEST",res)
			  res.status(200).send(ret)})
			 .catch((err) => res.status(400).send(err));
		  	break;
	}
}
