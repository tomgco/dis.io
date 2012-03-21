var managers = require('../lib/discovery').managers
  , zmqManagers = require('../lib/discovery').zmqManagers
  , pipe = require('piton-pipe').createPipe()
  , Task = require('../schema/Task.js')
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
    pipe.add(function(value, cb) {
      zmqManagers.listAll(function(err, data) {
        value.zmqManagers = data;
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
          , zmqManagers: store.zmqManagers
        }
      });
    });
  };

  task.listAll = function(req, res) {
    task.crudDelegate.listAll(function(err, tasks) {
      if (err) {
        res.end(404);
      } else {
        res.render('manage', {
            title: 'Tasks'
          , locals: {
                styles: []
              , javascript: []
              , tasks: tasks
            }
        });
      }
    });
  };

  task.edit = function(req, res) {
    task.crudDelegate.findById(req.params.id, function(err, entity) {
      res.render('form', {
          title: 'Editing Task ID: ' + req.params.id
        , locals: {
              styles: [
                '/stylesheets/editor.css'
              ]
            , javascript: [
                '/ace/src/ace.js'
              , '/ace/src/theme-twilight.js'
              , '/ace/src/mode-javascript.js'
              , '/javascript/editor.js'
              , '/javascript/tooltip.js'
              ]
            , action: '/task/update/' + req.params.id
            , fields: task.fields
            , values: entity
            , errors: req.flash('errors')
          }
      });
    });
  };

  task.create = function(req, res) {
    var errors = req.flash('errors').toString()
      , values = req.flash('values').toString()
      ;
      console.log(errors);
    res.render('form', {
        title: 'New Task'
      , locals: {
            styles: [
              '/stylesheets/editor.css'
            ]
          , javascript: [
              '/ace/src/ace.js'
            , '/ace/src/theme-twilight.js'
            , '/ace/src/mode-javascript.js'
            , '/javascript/editor.js'
            , '/javascript/tooltip.js'
            ]
          , fields: task.fields
          , values: errors ? JSON.parse(values) : {}
          , errors: errors ? JSON.parse(errors) : {}
        }
    });
  };

  return get;
};