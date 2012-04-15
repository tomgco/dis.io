var Task = require('../schema/Task')
  , validation = require('../lib/validation')
  , _ = require('underscore')
  ;

module.exports = function(app, connection) {
  var post = {}
    , task = post.task = new Task(connection)
    ;

  task.create = function(req, res) {
    _.extend(req.body, req.files);
    validation(req, task, function(err, entity) {
      if (!Object.keys(err).length) {
        task.crudDelegate.create(entity, redirect.bind(this, res));
      } else {
        req.flash('errors', JSON.stringify(err));
        req.flash('values', JSON.stringify(entity));
        redirect(res, err);
      }
    });
  };

  task.update = function(req, res) {
    _.extend(req.body, req.files);
    // emit error event to stop callback spagettihhhoh
    validation(req, task, function(err, entity) {
      if (!Object.keys(err).length) {
        task.crudDelegate.update(task.idFilter(req.params.id), entity, redirect.bind(this, res));
      } else {
        req.flash('errors', JSON.stringify(err));
        req.flash('values', JSON.stringify(entity));
        redirect(res, err);
      }
    });
  };
  return post;
};

function redirect(res, err) {
  if (err) {
    res.redirect('back');
  } else {
    res.redirect('/task/');
  }
}