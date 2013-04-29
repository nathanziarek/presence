var fs = require("fs"),
    path = require("path");
/*
 * GET home page.
 */

exports.index = function(req, res){

    var index = path.normalize(path.join(__dirname, "..", "data", "_index"));
    
    fs.readFile(index, "utf-8", function(err, data) {
        nodes = JSON.parse(data);
        res.render('list', { 
            title: "Late to the Party", 
            keywords:[], 
            summary: "Just how far behind am I?", 
            links: nodes,
            canonical: "http://latetotheparty.co"
        });
    });
    
}