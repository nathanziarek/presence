var fs = require("fs-extra"),
    path = require("path"),
    wrench = require("wrench"),
    cache = path.normalize(path.join(__dirname, "..", "..", "cache")),
    githubInfo = {
        user:"nathanziarek", 
        repo: "late-to-the-party"
    };

module.exports = {

    createFileId: function(title) {
        fileId = title.trim().toLowerCase().replace(/[^\w\d]+/gim, "-");
        if(process.index[fileId] != undefined) {
            module.exports.createFileId(title + " " + ["ABCDEFGHIJKLMNOPQRSTUVWXYZ"][Math.floor(Math.random()*26)]);
        } else {
            return fileId;
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
        
        if(oSummary['publishedOn'] == undefined) { oSummary['publishedOn'] = new Date(); }
        if(oSummary.author == undefined) { oSummary.author = "Nathan Ziarek"; }
        if(oSummary.authorConnect == undefined) { oSummary.authorConnect = {}; }
        if(oSummary.authorConnect.google == undefined) { oSummary.authorConnect.google = "https://plus.google.com/108120786603469208780"; }
        if(oSummary.authorConnect.twitter == undefined) { oSummary.authorConnect.twitter = "nathanziarek"; }
        if(oSummary.authorConnect.linkedin == undefined) { oSummary.authorConnect.linkedin = "nathanziarek"; }
        
        oSummary['publishedOn'] = new Date(oSummary['publishedOn']);
    
        if(summary != undefined && summary[0]) {
            copy = mdText.replace(summary[0], "");
        } else {
            copy = mdText;
        }
        
        if(!skipBody) {
            //oSummary.copy_orig = copy.trim();
            oSummary.copy = typogr.typogrify(converter.makeHtml(copy.trim()));
            oSummary.copy = oSummary.copy.replace("<h1 ", '<h1 itemprop="name" ');
            //oSummary.mdText = mdText;
        }
        
        title = mdText.match(/^\#(.*?)$/gim);
        if(title && title[0]) { oSummary.title = title[0].replace("#", "").trim(); }
        
        return oSummary;
    },
        
    getFromGitHub: function(filename) {

        if(filename.indexOf("articles/") < 0) { return; }
        
        var GitHubApi = require("github"),
            github = new GitHubApi({
                version: "3.0.0",
                timeout: 5000
            });
            github.authenticate({
                type: "basic",
                username: "nathanziarek",
                password: "l1ghty3ar"
            });
            
        githubInfo.path = filename;
            
        github.repos.getContent(githubInfo, function(err, data){

            if (err) { console.log(err); return }
            
            data = new Buffer(data.content, data.encoding).toString("utf8")

            data = module.exports.parse(data);
            data.id = module.exports.createFileId(data.title);
            data.file = data.id + ".json";
            data.href = "/" + data.id;
            data.canonical = "http://latetotheparty.co/" + data.id;
            
            fs.writeFile(path.join(cache, data.file), JSON.stringify(data));
            
            delete data.copy;
            
            process.index.articles[data.id] = data;
            
            fs.writeFile(path.join(cache, "index.json"), JSON.stringify(process.index));
            
        });
        
    },
    
    removeFromCache: function(filename) {},
    
    reIndex: function() {
    }
    
}
