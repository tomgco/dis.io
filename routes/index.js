exports.createRoutes = function(app, connection) {
  return {
      get: require('./get.js')(app, connection)
    , post: require('./post.js')(app, connection)
  };
};
