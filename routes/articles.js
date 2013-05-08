var fs = require("fs"),
    path = require("path");
    
var presence = require('../scripts/presence.js');

    exports.render = function(req, res){
        
        var key = req.url.replace(/^\//, ""); console.log(process.index.articles[key]);
        if(process.index.articles[key] == undefined || process.index.articles[key].file == undefined) {
            res.redirect(301, "/"); 
            return; 
        }
        var file = path.normalize(path.join(__dirname, '../cache', process.index.articles[key].file));

        fs.readFile(file, "utf-8", function(err, data) {
            if (err) {res.redirect(301, "/");  return; };
            res.render("article", JSON.parse(data));
        });
    };