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
        console.log(data);
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
    var errors = req.flash('errors').toString()
      , values = req.flash('values').toString()
      ;

    task.crudDelegate.findById(req.params.id, function(err, entity) {
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
            ]
          , javascript: [
              '/ace/src/ace.js'
            , '/ace/src/theme-twilight.js'
            , '/ace/src/mode-javascript.js'
            , '/javascript/editor.js'
            , '/javascript/tooltip.js'
            ]
          , fields: task.fields
          , values: values ? JSON.parse(values) : {}
          , errors: errors ? JSON.parse(errors) : {}
        }
    });
  };

  return get;
};