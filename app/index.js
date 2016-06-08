var server = require("./server/server_config.js");

var port = process.env.PORT || 8080;


server.listen(port);

console.log('Listening On Port ' + port);