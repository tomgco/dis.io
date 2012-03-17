var managers = require('../lib/discovery').managers
  , zmqManagers = require('../lib/discovery').zmqManagers
  , pipe = require('piton-pipe').createPipe()
  , Task = require('../schema/Task.js')
  ;
module.exports = function(app, crudDelegate) {
  var get = {}
    , task = get.task = new Task();

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

  task.manage = function(req, res) {
    res.render('manage', {
        title: 'Tasks'
      , locals: {
            styles: []
          , javascript: []
          , tasks: []
        }
    });
  };

  task.create = function(req, res) {
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
          , values: req.flash('values')
          , errors: req.flash('errors')
        }
    });
  };

  return get;
};