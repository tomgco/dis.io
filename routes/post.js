var Task = require('../schema/Task.js');

module.exports = function(app, crudDelegate) {
  var post = {}
    , task = post.task = new Task();

  task.create = function(req, res) {
    // console.log(res);
    res.redirect('back');
  };

  task.update = function(req, res) {

  };
  return post;
};