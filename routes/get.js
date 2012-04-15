var managers = require('../lib/discovery').managers
  , distributors = require('../lib/discovery').distributors
  , pipe = require('piton-pipe').createPipe()
  , Task = require('../schema/Task')
  , Result = require('../schema/Result')
  ;
module.exports = function(app, connection) {
  var get = {}
    , task = get.task = new Task(connection);

  get.index = function(req, res) {
    pipe.add(function(value, cb) {
      managers.listAll(function(err, data) {
        value.managers = data;
        cb(err, value);
      });
    });
    pipe.run({}, function(error, store) {
      res.render('index', {
          title: 'dis.io Dashboard'
        , locals: {
            styles: []
          , javascript: []
          , managers: store.managers
          , currentUrl: req.url
        }
      });
    });
  };

  get.distributors = function(req, res) {
    pipe.add(function(value, cb) {
      distributors.listAllOnline(function(err, data) {
        value.distributors = data;
        cb(err, value);
      });
    });
    pipe.run({}, function(error, store) {
      var addresses = []
        , keys = Object.keys(store.distributors)
        ;
      for (var i = 0; i < keys.length; i++) {
        var a = store.distributors[keys[i]];
        var newAdd = {
              hosts: a.addresses
            , port: a.port
          };
        addresses.push(newAdd);
      }
      res.json(addresses);
    });
  };

  task.listAll = function(req, res) {
    task.crudDelegate.listAll(function(err, tasks) {
      if (err) {
        res.end(404);
      } else {
        res.render('task', {
            title: 'Tasks'
          , locals: {
                styles: []
              , javascript: []
              , tasks: tasks
              , currentUrl: req.url
            }
        });
      }
    });
  };

  task.view = function(req, res) {
    var result = new Result(connection, req.params.id);
    result.crudDelegate.count({}, function(err, count) {
      task.crudDelegate.findById(task.idFilter(req.params.id), function(err, entity) {
        res.render('view', {
            title: 'Viewing Task ID: ' + req.params.id
          , locals: {
                styles: [
                    '/stylesheets/editor.css'
                  , '/prettify/prettify.css'
                ]
              , javascript: [
                  '/ace/src/ace.js'
                , '/prettify/prettify.js'
                , '/ace/src/theme-twilight.js'
                , '/ace/src/mode-javascript.js'
                , '/javascript/editor.js'
                , '/javascript/tooltip.js'
                ]
              , fields: task.fields
              , values: entity
              , currentUrl: req.url
              , editid: req.params.id
              , stats: {
                  count: count
                }
            }
        });
      });
    });
  };

  task.edit = function(req, res) {
    var errors = req.flash('errors').toString()
      , values = req.flash('values').toString()
      ;

    task.crudDelegate.findById(task.idFilter(req.params.id), function(err, entity) {
      res.render('form', {
          title: 'Editing Task ID: ' + req.params.id
        , locals: {
              styles: [
                  '/stylesheets/editor.css'
                , '/prettify/prettify.css'
              ]
            , javascript: [
                '/ace/src/ace.js'
              , '/prettify/prettify.js'
              , '/ace/src/theme-twilight.js'
              , '/ace/src/mode-javascript.js'
              , '/javascript/editor.js'
              , '/javascript/tooltip.js'
              ]
            , action: '/task/update/' + req.params.id
            , fields: task.fields
            , values: values ? JSON.parse(values) : entity
            , errors: errors ? JSON.parse(errors) : {}
            , currentUrl: req.url
          }
      });
    });
  };

  task.create = function(req, res) {
    var errors = req.flash('errors').toString()
      , values = req.flash('values').toString()
      ;

    res.render('form', {
        title: 'New Task'
      , locals: {
            styles: [
                '/stylesheets/editor.css'
              , '/prettify/prettify.css'
            ]
          , javascript: [
              '/ace/src/ace.js'
            , '/prettify/prettify.js'
            , '/ace/src/theme-twilight.js'
            , '/ace/src/mode-javascript.js'
            , '/javascript/editor.js'
            , '/javascript/tooltip.js'
            ]
          , fields: task.fields
          , values: values ? JSON.parse(values) : {}
          , errors: errors ? JSON.parse(errors) : {}
          , currentUrl: req.url
        }
    });
  };

  return get;
};