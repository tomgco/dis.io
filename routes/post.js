var Task = require('../schema/Task.js')
  ;

module.exports = function(app, connection) {
  var post = {}
    , task = post.task = new Task(connection)
    ;

  task.create = function(req, res) {
    req.body.files = req.files;
    task.crudDelegate.create(req.body, redirect.bind(this, res));
  };

  task.update = function(req, res) {
    req.body.files = req.files;
    task.crudDelegate.update(req.params.id, req.body, redirect.bind(this, res));
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