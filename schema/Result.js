var CrudDelegate = require('dis.io-mongo-crud').crud
  , collection
  ;

module.exports = function(connection, id) {
  connection.collection('result'+id, function(error, loadedCollection) {
    collection = loadedCollection;
  });
  return {
      crudDelegate: CrudDelegate.createCrudDelegate(collection)
    , idFilter: CrudDelegate.objectIdFilter(connection)
  };
};