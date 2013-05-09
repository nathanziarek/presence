/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , article = require('./routes/articles')
  , output = require('./routes/output')
  , input = require('./routes/input')
  , http = require('http')
  , path = require('path');

  
/* Globals */
process.index = require('../cache/index.json');
  
var app = module.exports = express();

app.configure(function(){
  app.use(express.logger('dev'));
  app.use(express.compress());
  app.use(require('less-middleware')({ optimization:2, dest: __dirname + '/public', src: __dirname + '/public', compress: true }));
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public'), {"maxAge": 30*24*60*60*1000 }));
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  //app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/ping/github', input.github);
app.get('/rss', output.rss);
app.get('/sitemap', output.sitemap);
app.get('/:article', article.render);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
