var fs = require("fs-extra"),
    path = require("path"),
    wrench = require("wrench"),
    cache = path.normalize(path.join(__dirname, "..", "cache")),
    githubInfo = {
        user:"nathanziarek", 
        repo: "late-to-the-party"
    };

module.exports = {

    createFileId: function(title) {
        fileId = title.toLowerCase().replace(/[^\w\d]+/gim, "-");
        if(process.index[fileId] != undefined) {
            module.exports.createFileId(title + " " + ["ABCDEFGHIJKLMNOPQRSTUVWXYZ"][Math.floor(Math.random()*26)];
        } else {
            return fileId + ".json";
        }
    },

    parse: function(mdText, skipBody) {
        
        var Showdown = require("showdown"),
            typogr = require('typogr');
        
        var converter = new Showdown.converter();
    
        var summary = mdText.match(/{{({[\s\S]*?})}}/);
        var toReturn = {}, oSummary = { "title": "Late to the Party", "summary": "", "keywords" : [] };
        
        if(summary != undefined && summary[1] != null) {
            try {
                articleData = JSON.parse(summary[1]);
                for(key in articleData) {
                    if(articleData.hasOwnProperty(key)) {
                        oSummary[key] = articleData[key];
                    }
                }
            } catch(err) { }
        }
        
        if(oSummary['published-on'] == undefined) { oSummary['published-on'] = new Date(); }
        
        oSummary['published-on'] = new Date(oSummary['published-on']);
    
        if(summary != undefined && summary[0]) {
            copy = mdText.replace(summary[0], "");
        } else {
            copy = mdText;
        }
        
        if(!skipBody) {
            //oSummary.copy_orig = copy.trim();
            oSummary.copy = typogr.typogrify(converter.makeHtml(copy.trim()));
            //oSummary.mdText = mdText;
        }
        
        title = mdText.match(/^\#(.*?)$/gim);
        if(title && title[0]) { oSummary.title = title[0].replace("#", ""); }
    
        console.log(oSummary);
    
        return oSummary;
    },
        
    getFromGitHub: function(filename) {
        
        var GitHubApi = require("github"),
            github = new GitHubApi({
                version: "3.0.0",
                timeout: 5000
            });
            
        githubInfo.path = filename;
            
        github.repos.getContent(githubInfo, function(err, data){ 
            if (err) { console.log(err); return }
            return data;
        });
            
        
    },
    
    removeFromCache: function(filename) {},
    
    reIndex: function() {
    }
    
}