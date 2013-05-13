/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    article = require('./routes/articles'),
    output = require('./routes/output'),
    input = require('./routes/input'),
    http = require('http'),
    path = require('path');

  
/* Globals */
process.index = require('../cache/index.json');
//process.index = {"articles":{"developing-interactions-for-microsoft-kinect":{"title":"Developing Interactions for Microsoft Kinect","summary":"Will the Kinect's hackability build a new paradigm for human-computer interaction?","keywords":["kinect","ux","interaction"],"publishedOn":"2010-11-09T00:00:00.000Z","status":"publish","author":"Nathan Ziarek","authorConnect":{"google":"https://plus.google.com/108120786603469208780","twitter":"nathanziarek","linkedin":"nathanziarek"},"id":"developing-interactions-for-microsoft-kinect","file":"developing-interactions-for-microsoft-kinect.json","href":"/developing-interactions-for-microsoft-kinect","canonical":"http://latetotheparty.co/developing-interactions-for-microsoft-kinect"},"19-ways-to-ruin-a-survey":{"title":"19 ways to ruin a survey","summary":"If you don't want Jared Spool to eviscerate your survey, practice a modicum of UX.","keywords":["ux","survey"],"publishedOn":"2010-12-26T00:00:00.000Z","status":"publish","author":"Nathan Ziarek","authorConnect":{"google":"https://plus.google.com/108120786603469208780","twitter":"nathanziarek","linkedin":"nathanziarek"},"id":"19-ways-to-ruin-a-survey","file":"19-ways-to-ruin-a-survey.json","href":"/19-ways-to-ruin-a-survey","canonical":"http://latetotheparty.co/19-ways-to-ruin-a-survey"},"five-principles-for-choosing-and-using-typefaces":{"title":"Five Principles for Choosing and Using Typefaces","summary":"A huge part of our day is spent interacting with typography. Smashing Magazine offers a great primer on why fonts really matter.","keywords":["type"],"publishedOn":"2010-12-14T00:00:00.000Z","status":"publish","author":"Nathan Ziarek","authorConnect":{"google":"https://plus.google.com/108120786603469208780","twitter":"nathanziarek","linkedin":"nathanziarek"},"id":"five-principles-for-choosing-and-using-typefaces","file":"five-principles-for-choosing-and-using-typefaces.json","href":"/five-principles-for-choosing-and-using-typefaces","canonical":"http://latetotheparty.co/five-principles-for-choosing-and-using-typefaces"},"making-css-borders-work-for-you":{"title":"Making CSS Borders Work for You","summary":"Slick technique to make CSS arrows.","keywords":["ux","css"],"publishedOn":"2013-05-01T00:00:00.000Z","status":"published","author":"Nathan Ziarek","authorConnect":{"google":"https://plus.google.com/108120786603469208780","twitter":"nathanziarek","linkedin":"nathanziarek"},"id":"making-css-borders-work-for-you","file":"making-css-borders-work-for-you.json","href":"/making-css-borders-work-for-you","canonical":"http://latetotheparty.co/making-css-borders-work-for-you"},"writing-exceptional-urls":{"title":"Writing Exceptional URLs","summary":"It's easy to get lulled into thinking URLs don't matter...but they're part of the interface. Learn to love them.","keywords":["urls","seo","ux","canonical"],"status":"draft","publishedOn":"2031-01-01T00:00:00.000Z","author":"Nathan Ziarek","authorConnect":{"google":"https://plus.google.com/108120786603469208780","twitter":"nathanziarek","linkedin":"nathanziarek"},"id":"writing-exceptional-urls","file":"writing-exceptional-urls.json","href":"/writing-exceptional-urls","canonical":"http://latetotheparty.co/writing-exceptional-urls"},"speed-matters":{"title":"Speed Matters","summary":"A half-second increase in page load time might cost you 20%.","keywords":["page speed","seo","ux"],"publishedOn":"2031-01-01T00:00:00.000Z","status":"draft","author":"Nathan Ziarek","authorConnect":{"google":"https://plus.google.com/108120786603469208780","twitter":"nathanziarek","linkedin":"nathanziarek"},"id":"speed-matters","file":"speed-matters.json","href":"/speed-matters","canonical":"http://latetotheparty.co/speed-matters"},"there-is-value-in-the-disruption":{"title":"There is Value in the Disruption","summary":"Making things objectively better may not always equal better usability.","keywords":["search","facets","ux"],"publishedOn":"2013-04-25T00:00:00.000Z","status":"published","author":"Nathan Ziarek","authorConnect":{"google":"https://plus.google.com/108120786603469208780","twitter":"nathanziarek","linkedin":"nathanziarek"},"id":"there-is-value-in-the-disruption","file":"there-is-value-in-the-disruption.json","href":"/there-is-value-in-the-disruption","canonical":"http://latetotheparty.co/there-is-value-in-the-disruption"}},"mapping":{}};
  
var app = module.exports = express();
    app.version = '0.1.3',
    versionator = require('versionator').create(app.version);

app.configure(function(){
  app.use(express.logger('dev'));
  app.use(express.favicon(__dirname + '/public/icons/favicon.ico'));
  app.use(express.compress());
  app.use(versionator.middleware);
  app.use(require('less-middleware')({ optimization:2, dest: __dirname + '/public', src: __dirname + '/public', compress: true }));
  app.use(express.methodOverride());
  app.locals({ versionPath: versionator.versionPath });
  app.use(express.static(path.join(__dirname, 'public'), {"maxAge": 30*24*60*60*1000 }));
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
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