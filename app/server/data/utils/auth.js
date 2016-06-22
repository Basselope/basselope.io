"use strict";

const jwt = require('jwt-simple');
const jwtTokenSecret = 'To gulp or swigit that is the question';

module.exports = {
	
	authenticate: function(req, res, username, password) {
		var token = jwt.encode({
  		iss: username,
  		exp: '720hr'
			},
			jwtTokenSecret);
		res.status(200).send(token);
	}

}