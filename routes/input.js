var fs = require("fs"),
    path = require("path");
    
var presence = require('../scripts/presence.js');

var dataDir = path.normalize(path.join(__dirname, "..", "cache"));

exports.github = function(req, res) {
    
    var payload = (JSON.parse(req.body.payload)),
        commit, addition, changed, removed;
    
    for( var c = 0; c < payload.commits.length; c++ ) {
        commit = payload.commits[c];
        for( var a = 0; a < commit.added.length; a++ ) {
            addition = commit.added[a];
            console.log("New File", addition);
        }
        for( var m = 0; m < commit.modified.length; m++ ) {
            changed = commit.modified[m];
            console.log("Changed File", changed);
        }
        for( var r = 0; r < commit.removed.length; r++ ) {
            removed = commit.removed[r];
            console.log("Deleted File", removed);
        }
        
    }
    
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