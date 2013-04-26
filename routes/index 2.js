var fs = require("fs"),
    path = require("path");
/*
 * GET home page.
 */

exports.index = function(req, res){

    // Open the _index
    var index = path.normalize(path.join(__dirname, "..", "data", "_index"));
    var rebuild = false;
    var dir = path.normalize(path.join(__dirname, "..", "data"));
    var nodes = [];
    //res.render('article', { copy: JSON.stringify(fs.statSync(index)) });
    
    fs.readFile(index, "utf-8", function(err, data) {
        nodes = JSON.parse(data);
        if(err) { rebuild = true; }
        lastModified = new Date(fs.statSync(index).mtime);
        if( (new Date()).getTime() - lastModified.getTime() > 30 ) { rebuild = true; }
        if(rebuild) { 
            //buildIndex();
            fs.writeFile(index, JSON.stringify(nodes));
        }
        res.render('list', { title: "Late to the Party", keywords:[], summary: "Just how far behind am I?", links: nodes });
        //res.render('article', { copy: dir });
    });
    
    function buildIndex() {
        var tmpNodes = [], data;
        var files = fs.readdirSync(dir), file;
        for(var i = 0; i < files.length; i++) {
            if(files[i] != "_index") {
                file = path.join(dir, files[i]);
                stat = fs.statSync(file);                
                data = fs.readFileSync(file, "utf8");
                title = data.match(/^\#(.*?)$/gim);
                if(title && title[0]) {
                    tmpNodes.push({
                        href: "/" + files[i].replace(".md",""), 
                        file:files[i], 
                        modified: stat.mtime, 
                        title: title[0].replace("#", "")
                    });
                }
            }
        }
        nodes = tmpNodes.sort(sortFunction);
    }
    
    var articles = {
        list: [],
        refresh: function() {
            // Open path to all articles
            // Scan them for titles and such
            // Clear this.list
            // Add all items to list
            // return this
        },
        getTitle: function() {}
    }
    
    
};

function sortFunction(a,b){  
    var dateA = new Date(a.date).getTime();
    var dateB = new Date(b.date).getTime();
    return dateA > dateB ? 1 : -1;  
}; 