
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , article = require('./routes/articles')
  , rss = require('./routes/rss')
  , http = require('http')
  , path = require('path');
  
var app = module.exports = express();

app.configure(function(){
  app.use(express.logger('dev'));
  app.use(express.compress());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public'), {"maxAge": 30*24*60*60*1000 }));
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  //app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(app.router);
  
  //app.use(require('less-middleware')({ src: __dirname + '/public', compress: true }));
  
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/rss', rss.render);
app.get('/:article', article.render);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
