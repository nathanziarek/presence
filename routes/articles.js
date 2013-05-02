var fs = require("fs"),
    path = require("path");
    
var presence = require('../scripts/presence.js');


    exports.render = function(req, res){
    
        var key = req.url.replace(/^\//, "");
        var file = path.normalize(path.join(__dirname, "../", "cache", key) + ".md");
        
        fs.readFile(file, "utf-8", function(err, data) {
            if (err) { res.redirect(301, "/"); return; };
            //res.etagify();
            articleData = presence.parse(data);
            articleData.canonical = "http://latetotheparty.co/" + key
            res.render("article", articleData);
        });
    };