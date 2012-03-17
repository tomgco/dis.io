module.exports = function() {
  return {
    fields: {
        'Basic Information': {
            'Name': {
                'type': 'text'
              , 'name': 'Name'
              , 'help': 'The name of your task.'
            }
          , 'Description': {
                'type': 'textarea'
              , 'name': 'Description'
              , 'help': 'A description of your task.'
            }
          , 'Number Of Workers': {
                'type': 'number'
              , 'name': 'NumberOfWorkers'
              , 'help': 'How many distributors a task will be scaled to.'
              , 'sideHelp': true
          }
        }
      , 'Workunit Information': {
            'Workunit': {
                'type': 'file'
              , 'name': 'WorkunitFile'
              , 'help': 'only .js files are valid at the moment.'
            }
          , 'Payload': {
                'type': 'code'
              , 'name': 'Payload'
              , 'help': 'A JSON reprisentation of the Payload.'
              , 'sideHelp': true
          }
          , 'Iteration Attempts': {
                'type': 'number'
              , 'name': 'IterationAttempts'
              , 'help': 'Tells the distributor how many times it should distribute a payload for validation.'
              , 'sideHelp': true
          }
        }
    }
  };
};