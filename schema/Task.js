var CrudDelegate = require('dis.io-mongo-crud').crud
  , collection
  , validation = require('piton-validity').validation
  ;

module.exports = function(connection) {
  connection.collection('task', function(error, loadedCollection) {
    collection = loadedCollection;
  });
  return {
      fields: {
        'Basic Information': {
            'Name': {
                'type': 'text'
              , 'name': 'Name'
              , 'help': 'The name of your task.'
              , 'validation': [validation.required]
            }
          , 'Description': {
                'type': 'textarea'
              , 'name': 'Description'
              , 'help': 'A description of your task.'
              , 'validation': [validation.required]
            }
          , 'NumberOfWorkers': {
                'type': 'number'
              , 'name': 'Number Of Workers'
              , 'help': 'How many distributors a task will be scaled to.'
              , 'sideHelp': true
              , 'validation': [validation.required, validation.integer]
          }
        }
      , 'Workunit Information': {
            'Workunit': {
                'type': 'file'
              , 'name': 'Workunit'
              , 'help': 'only .js files are valid at the moment.'
              , 'validation': [validation.required]
            }
          , 'Payload': {
                'type': 'code'
              , 'name': 'Payload'
              , 'help': 'A JSON reprisentation of the Payload.'
              , 'sideHelp': true
              , 'validation': [validation.required]
          }
          , 'IterationAttempts': {
                'type': 'number'
              , 'name': 'Iteration Attempts'
              , 'help': 'Tells the distributor how many times it should distribute a payload for validation.'
              , 'sideHelp': true
              , 'validation': [validation.required, validation.integer]
          }
        }
    }
  , crudDelegate: CrudDelegate.createCrudDelegate(collection)
  , idFilter: CrudDelegate.objectIdFilter(connection)
  };
};