var fs = require("fs"),
    path = require("path");
/*
 * GET home page.
 */

exports.index = function(req, res){
    
    res.render('list', { 
        title: "Late to the Party", 
        keywords:[], 
        summary: "Just how far behind am I?", 
        links: process.index,
        canonical: "http://latetotheparty.co"
    });
    
}