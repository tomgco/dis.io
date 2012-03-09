var managers = require('../lib/discovery').managers
  , zmqManagers = require('../lib/discovery').zmqManagers
  , pipe = require('piton-pipe').createPipe()
  ;

exports.index = function(req, res) {
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
      title: 'dis.io Dashboard',
      locals: {
          styles: []
        , javascript: []
        , managers: store.managers
        , zmqManagers: store.zmqManagers
      }
    });
  });
};