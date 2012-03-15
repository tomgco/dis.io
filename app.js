
/**
 * Module dependencies.
 */

var express = require('express')
  , discovery = require('./lib/discovery')
  , routes = require('./routes')
  , gzippo = require('gzippo')
  , stylus = require('stylus')
  , colors = require('colors')
  , app = express.createServer()
  ;

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(stylus.middleware({ src: __dirname + '/public/', compress: true }));
  app.use(gzippo.staticGzip(__dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  console.log('WARN: '.red + 'This application is running in development mode.'.yellow);
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.get.index);

app.get('/manage', routes.get.manage);

app.get('/create', routes.get.create);

app.listen(process.env.PORT || 3000);

console.log('http://' + app.address().address + ':' + app.address().port );