var fs = require('fs');
var path = require('path');
var express  = require('express');
var bodyParser = require('body-parser');   
var APIRouter = require('../../app/server/router/router_API.js');
var app = express();

const public_directory = path.join(__dirname , '../public');                     


app.use(bodyParser.json()); 
app.use(express.static(public_directory));
 //reqn res next

var port = process.env.PORT || 8080;



app.use(APIRouter.routerHandler);


app.get('/*', function(req, res, next) {
  console.log(__dirname);
  fs.createReadStream(path.join(public_directory,"index.html")).pipe(res);
});









// var request = require('request');
// var consumer_key = '9Daz6zUNQKhNYzogJD040b3r1';
// var consumer_secret = 'sivAWFQ3r1MzfnvR1PULAoARrruhizjYpXb803jmx8YwvH4b1E';
// var access_token = '3344662383-2Pgveoc6mHoUpbzXOwcwt5Nt6JPuEItsBjU8xXU';
// var access_token_secret = 'q7e35cYUkgbMcuTIHmO6DpFotta37arrQ2z19ztkJt4M3';

// var enc_secret = new Buffer(consumer_key + ':' + consumer_secret).toString('base64');

// var oauthOptions = {
//   url: 'https://api.twitter.com/oauth2/token',
//   headers: {'Authorization': 'Basic ' + enc_secret, 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
//   body: 'grant_type=client_credentials'
// };

// request.post(oauthOptions, function(e, r, body) {
  
// });



// var twitterProxyServer = require('twitter-proxy');
// twitterProxyServer({
//   "consumerKey": consumer_key,
//   "consumerSecret": consumer_secret,
//   "accessToken": access_token,
//   "accessTokenSecret": access_token_secret
// });


















module.exports = app;



// app.post('/FILE', function(req, res) {
//   DO SOMETHING(req, res);
// })




