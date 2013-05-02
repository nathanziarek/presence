var fs = require("fs"),
    path = require("path"),
    rss = require('rss');
    
    
var presence = require('../scripts/presence.js');


exports.render = function(req, res){

    var filesList = [], dataArray = [];

    var dataIndex = path.normalize(path.join(__dirname, "..", "cache", "_index"));
    var dataDir = path.normalize(path.join(__dirname, "..", "cache"));
    
    // File List 01
    fs.readdir(dataDir, function(err, files){
    
        console.log("01", files);
        
        if(err) { return; }
        
        var file;
        
        for(var i = 0; i < files.length; i++) {
            if(files[i] != "_index") {
                filesList.push(files[i]);
            }
        }
        
        getAndPush();
        
    });
    
    function getAndPush(){
        console.log("getAndPush");
        f = filesList.pop();
        if(f) {
            file = path.normalize(path.join(__dirname, "..", "cache", f));
            fs.readFile(file, "utf-8", function(err, data) {
                if (err) { return; };
                data = presence.parse(data);
                dataArray.push({
                    file: f,
                    href: f.replace(".md", ""),
                    modified: new Date(),
                    title: data.title,
                    summary: data.summary,
                    keywords: data.keywords
                });
                getAndPush(); return;
            });
        } else {
            file = path.normalize(path.join(__dirname, "..", "cache", "_index"));
            fs.writeFile(file, JSON.stringify(dataArray), function (err) {
                if (err) { return }
                var feed = new rss({
                    title: "Late to the Party",
                    description: "All the stuff I'm just discovering that you've probably moved on from.",
                    feed_url: 'http://latetotheparty.co/rss',
                    site_url: 'http://latetotheparty.co',
                    author: 'Nathan Ziarek'
                });
                for( var i = 0; i < dataArray.length; i++ ) {
                    feed.item({
                        title:  dataArray[i].title,
                        description: dataArray[i].summary,
                        url: 'http://latetotheparty.co/' + dataArray[i].href,
                        date: dataArray[i].modified
                    });
                }
                var xml = feed.xml();
                //res.etagify();
                res.send(xml);
                
            });
        }
    }


                
};