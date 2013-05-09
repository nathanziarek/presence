var presence = require('../scripts/presence.js'),
    fs = require('fs'),
    path = require('path');

exports.github = function(req, res) {
    
    var payload = (JSON.parse(req.body.payload)),
        commit, data;
    
    for( var c = 0; c < payload.commits.length; c++ ) {
    
        commit = payload.commits[c];
    
        for( var a = 0; a < commit.added.length; a++ ) {
            presence.getFromGitHub(commit.added[a]);
        }
    
        for( var a = 0; a < commit.modified.length; a++ ) {
            presence.getFromGitHub(commit.modified[a]);
        }
    
        for( var a = 0; a < commit.removed.length; a++ ) {
            presence.removeFromCache(commit.removed[a]);
        }
        
    }
    
};
