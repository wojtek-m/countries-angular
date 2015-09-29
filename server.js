
var http = require('http');
var path = require('path');
var async = require('async');
var express = require('express');
var cors = require('cors');

var Flickr = require('flickrapi'),
  flickrOptions = {
    api_key: 'fb4aacb85679883135400f881e7540be',
    secret: '34b5a4be88d13ddd'
  }
  
Flickr.tokenOnly(flickrOptions, function(error, flickr) {
});


var router = express();
var server = http.createServer(router);

router.use(cors());
router.use(express.static(path.resolve(__dirname, 'public')));
router.use('/bower_components',  express.static(__dirname + '/bower_components'));



server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
