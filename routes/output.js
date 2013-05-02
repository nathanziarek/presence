var fs = require("fs"),
    path = require("path"),
    rss = require('rss'),
    sm = require('sitemap');

var dataDir = path.normalize(path.join(__dirname, "..", "cache"));
    
var presence = require('../scripts/presence.js');

exports.sitemap = function(req, res) {

    var urls = [{ url: "/", changefreq: "daily", priority: 1 }];

    fs.readdir(dataDir, function(err, files){
        
        if(err) { return; }
        
        for(var i = 0; i < files.length; i++) {
            if(files[i] != "_index" && files[i] != ".DS_Store") {
                urls.push({ url: "/" + files[i].replace(".md", ""), changefreq: "monthly", priority: .7 });
            }
        }
        
        sitemap = sm.createSitemap({
            hostname: "http://latetotheparty.co",
            cacheTime: 600000,
            urls: urls
        });
        
        res.header('Content-Type', 'application/xml');
        res.send( sitemap.toString() );
        
    });

}


exports.rss = function(req, res){

    var filesList = [], dataArray = [];

    var dataIndex = path.normalize(path.join(__dirname, "..", "cache", "_index"));
    
    // File List 01
    fs.readdir(dataDir, function(err, files){
        
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