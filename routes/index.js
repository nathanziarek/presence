var fs = require("fs"),
    path = require("path");
/*
 * GET home page.
 */

exports.index = function(req, res){

    var articleList = [];

    for (key in process.index.articles) {
        if (process.index.articles.hasOwnProperty(key)) {
           if(process.index.articles[key].status != "draft"){
               articleList.push({ 
                   href: process.index.articles[key].href,
                   title: process.index.articles[key].title,
                   summary: process.index.articles[key].summary,
                   "publishedOn": new Date(process.index.articles[key]['publishedOn']).toString()
               });
           }
        }
    }

    articleList.sort(function(a, b){
        var dateA = new Date(a['publishedOn']), dateB = new Date(b['publishedOn']);
        return dateB-dateA;
    });
        
    res.render('list', { 
        title: "Late to the Party", 
        keywords: [], 
        summary: "Just how far behind am I?", 
        links: articleList,
        canonical: "http://latetotheparty.co",
        href: "/"
    });

    
}
