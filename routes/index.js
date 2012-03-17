exports.createRoutes = function(app, crudDelegate) {
  return {
      get: require('./get.js')(app, crudDelegate)
    , post: require('./post.js')(app, crudDelegate)
  };
};
