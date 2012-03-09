var packageJSON = require('../package.json')
  , appVersion = 'v' + packageJSON.version.split('.').slice(0, -1).join('-')
  ;

exports.managers = require('dis.covery')('disio-manager', appVersion);
exports.zmqManagers = require('dis.covery')('zmq-manager', appVersion);