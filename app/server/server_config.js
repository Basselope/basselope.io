var fs = require('fs');
var path = require('path');
var express  = require('express');
var bodyParser = require('body-parser');
var router_API = require('../../app/server/router/router_API.js');
var app = express();

const public_directory = path.join(__dirname , '../public/dist');

app.use(bodyParser.json());
app.use(express.static(public_directory));

var port = process.env.PORT || 8080;

app.use(router_API);
//app.post('/login', route.utils.login);
app.get('/*', function(req, res, next) {
  fs.createReadStream(path.join(public_directory,"index.html")).pipe(res);
});

module.exports = app;




