var discovery = require('../lib/discovery');

exports.index = function(req, res) {
  discovery.listAll(function(err, data) {
    res.render('index', {
      title: 'dis.io Dashboard',
      locals: {
          styles: []
        , javascript: []
        , managers: data
      }
    });
  });
};