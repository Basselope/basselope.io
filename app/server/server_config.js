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


module.exports = app;




