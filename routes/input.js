var path = require("path");
        
var presence = require('../scripts/presence.js');

exports.github = function(req, res) {
    
    var payload = (JSON.parse(req.body.payload)),
        commit, addition, changed, removed;
    
    for( var c = 0; c < payload.commits.length; c++ ) {
    
        commit = payload.commits[c];
    
        for( var a = 0; a < commit.added.length; a++ ) {
            presence.getFromGitHub(commit.added[a], "added");
        }
    
        for( var a = 0; a < commit.modified.length; a++ ) {
            presence.getFromGitHub(commit.modified[a], "modified");
        }
    
        for( var a = 0; a < commit.removed.length; a++ ) {
            removed = commit.removed[r];
            presence.removeFromCache(commit.removed[a]);
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
