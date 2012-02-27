exports.index = function(req, res) {
  res.render('index', {
    title: 'dis.io Dashboard',
    locals: {
      styles: [],
      javascript: []
    }
  });
};