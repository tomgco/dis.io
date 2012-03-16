exports.createRoutes = function(crudDelegate) {
  return {
      get: require('./get.js')(crudDelegate)
    , post: require('./post.js')(crudDelegate)
  };
};
