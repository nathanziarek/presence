var fs = require("fs"),
    path = require("path"),
    rss = require('rss'),
    sm = require('sitemap');

var dataDir = path.normalize(path.join(__dirname, "..", "cache"));
    
var presence = require('../scripts/presence.js');

exports.sitemap = function(req, res) {

    var urls = [{ url: "/", changefreq: "daily", priority: 1 }];

    for (key in process.index.articles) {
        if (process.index.articles.hasOwnProperty(key)) {
           if(process.index.articles[key].status != "draft"){
               urls.push({ 
                   url: process.index.articles[key].href,
                   changefreq: "monthly",
                   priority: .8
               });
           }
        }
    }

        sitemap = sm.createSitemap({
            hostname: "http://latetotheparty.co",
            cacheTime: 600000,
            urls: urls
        });
        
        res.header('Content-Type', 'application/xml');
        res.send( sitemap.toString() );

}


exports.rss = function(req, res){

    var items = [],
        feed = new rss({
            title: "Late to the Party",
            description: "All the stuff I'm just discovering that you've probably moved on from.",
            feed_url: 'http://latetotheparty.co/rss',
            site_url: 'http://latetotheparty.co',
            author: 'Nathan Ziarek'
        });

    for (key in process.index.articles) {
        if (process.index.articles.hasOwnProperty(key)) {
           if(process.index.articles[key].status != "draft"){
               feed.item({ 
                   title:  process.index.articles[key].title,
                   description: process.index.articles[key].summary,
                   url: 'http://latetotheparty.co/' + process.index.articles[key].href,
                   date: process.index.articles[key].publishedOn
               });
           }
        }
    }

    res.send(feed.xml());

}
