var fs = require("fs"),
    path = require("path");
/*
 * GET home page.
 */

exports.index = function(req, res){

    var articleList = [];

    for key in process.index.articles {
        if (process.index.articles.hasOwnProperty(key)) {
           if(process.index.articles[key].status != "draft"){
               articleList.push({ 
                   href: process.index.articles[key].href,
                   title: process.index.articles[key].title,
                   summary: process.index.articles[key].summary,
                   "posted-on": process.index.articles[key]['posted-on']
               });
           }
        }
    }

    articleList = articleList.sort();
    
    res.render('list', { 
        title: "Late to the Party", 
        keywords: [], 
        summary: "Just how far behind am I?", 
        links: articleList,
        canonical: "http://latetotheparty.co"
    });

    articleList.sort(function(a, b){
        var dateA = new Date(a['posted-on']), dateB = new Date(b['posted-on']);
        return dateB-dateA;
    });
    
}
