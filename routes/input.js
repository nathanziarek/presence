var fs = require("fs"),
    path = require("path");
    
var presence = require('../scripts/presence.js');

var dataDir = path.normalize(path.join(__dirname, "..", "cache"));

exports.github = function(req, res) {
    
    console.log("Request Received");
    console.log(JSON.parse(req.body.payload))
    
    /*var body = "";
    req.on('data', function (chunk) {
      body += chunk;
    });
    req.on('end', function () {
      console.log('POSTed: ' + body);
      res.writeHead(200);
      res.end(postHTML);
    });*/
    
    // get the request
    // turn it into a JSON object
    // loop through payload.commits[].added[]
    //                               .modified[]
    //                               .removed[]
    // download any new or modified files
    // delete any removed files
    // rebuild _index
};