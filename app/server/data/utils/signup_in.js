"use strict";
const auth = require('./auth.js');
//const bcrypt = require('bcrypt-nodejs');

var authModule  = function(){
	function comparePassword(pass, compare, callBack){
		// bcrypt.compare(pass, compare, function(err, isMatch) {
		// 	callback(isMatch);
		// });
	}
	function signup(req, res, next){
		

		//MAKE USERNAME
		//const username = 
		res.status(200).send("YES SIGN IN")
		//next();

	}
	function signin(req, res, next){
		//console.log("in signup", req);
		let username = req.body.username || "test";
		let password = req.body.password;
		//
		auth.authenticate(req, res, username, password)
		//res.status(200).send("YES SIGN IN")
		//next();
	}
	return {
		signUp:signup,
		signIn:signin
	}

}

module.exports = authModule();