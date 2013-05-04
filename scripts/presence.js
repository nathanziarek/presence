module.exports = {

    cache: path.normalize(path.join(__dirname, "..", "cache")),

    parse: function(data, skipBody) {
        
        var Showdown = require("showdown"),
            typogr = require('typogr');
                
        //var MultiMarkdown = require("multimarkdown");
        
        var converter = new Showdown.converter();
    
        var summary = data.match(/{{({[\s\S]*?})}}/);
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
    
        if(summary != undefined && summary[0]) {
            copy = data.replace(summary[0], "");
        } else {
            copy = data;
        }
        
        if(!skipBody) {
            oSummary.copy_orig = copy.trim();
            oSummary.copy = typogr.typogrify(converter.makeHtml(copy.trim()));
            //oSummary.copy = MultiMarkdown.convert(copy.trim());
            oSummary.data = data;
        }
        
        title = data.match(/^\#(.*?)$/gim);
        if(title && title[0]) { oSummary.title = title[0].replace("#", ""); }
    
        return oSummary;
    },
        
    getFromGitHub: function(filename, type) {
        var GitHubApi = require("github"),
            github = new GitHubApi({
                version: "3.0.0",
                timeout: 5000
            }),
            fs = require("fs"),
            path = require("path");
        github.getContent({
            user:"nathanziarek", 
            repo: "late-to-the-party", 
            path: addition 
            }, 
            function(err, data){ 
                if (err) { console.log(err); return }
                filePath = path.join(this.cache, "github", data.path);
                fileContents = new Buffer(data.content, data.encoding).toString('utf8');
                fs.writeFile(filePath, fileContents, {"encoding": "utf8"}, function(err) {
                    console.log(filePath, fileContents);
                });
            });
            
        
    },
    
    removeFromCache: function(filename) {},
    
    reIndex: function() {}
    
}