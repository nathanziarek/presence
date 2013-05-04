var fs = require("fs"),
    path = require("path"),
    GitHubApi = require("github"),
    github = new GitHubApi({
        version: "3.0.0",
        timeout: 5000
    });
        
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
            github.getContent({user:"nathanziarek", repo: "late-to-the-party", path: addition}, function(err, data){ console.log(data); });
        }
    
        for( var m = 0; m < commit.modified.length; m++ ) {
            changed = commit.modified[m];
            console.log("Changed File", changed);
            github.repos.getContent({user:"nathanziarek", repo: "late-to-the-party", path: changed}, function(err, data){ console.log(data); res.end(data); });
        }
    
        for( var r = 0; r < commit.removed.length; r++ ) {
            removed = commit.removed[r];
            console.log("Deleted File", removed);;
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
