const fs = require('fs');
const path = require('path');
const express  = require('express');
const bodyParser = require('body-parser');
const router_API = require('../../app/server/router/router_API.js');
const app = express();

const public_directory = path.join(__dirname , '../public/dist');

app.use(bodyParser.json());
app.use(express.static(public_directory));

const port = process.env.PORT || 8080;

app.use(router_API);
app.get('/*', function(req, res, next) {
  fs.createReadStream(path.join(public_directory,"index.html")).pipe(res);
});

module.exports = app;