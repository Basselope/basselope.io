var express  = require('express');
var bodyParser = require('body-parser');    

var app = express();

app.use(bodyParser.json());                                     
app.use(express.static(__dirname + '/../../app/public'));

var port = process.env.PORT || 8080;

app.get('/', function(req, res) {
  console.log(__dirname);
  res.sendFile(express.static(__dirname + '/index.html'));
});


module.exports = app;



// app.post('/FILE', function(req, res) {
//   DO SOMETHING(req, res);
// })




