var fs = require("fs"),
    path = require("path");
/*
 * GET home page.
 */

exports.index = function(req, res){

    var articleList = [],
        maxDate = new Date("1/1/1960"),
        minDate = new Date(),
        scaleTop = 1,
        scaleBot = .5;

    for (key in process.index.articles) {
        if (process.index.articles.hasOwnProperty(key)) {
           if(process.index.articles[key].status != "draft"){
               articleList.push({ 
                   href: process.index.articles[key].href,
                   title: process.index.articles[key].title,
                   summary: process.index.articles[key].summary,
                   "publishedOn": new Date(process.index.articles[key]['publishedOn']).toString()
               });
               maxDate = Math.max(maxDate, new Date(process.index.articles[key]['publishedOn']));
               minDate = Math.min(minDate, new Date(process.index.articles[key]['publishedOn']));
           }
        }
    }
    
    var rangeDate = maxDate - minDate;
    var rangeScale = scaleTop - scaleBot;
    for(i = 0; i < articleList.length; i++) {
        difDate = maxDate - new Date(articleList[i]["publishedOn"]);
        normDate = 1-(difDate/rangeDate);
        articleList[i].decay = Math.floor((rangeScale * normDate + scaleBot) * 10);
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
