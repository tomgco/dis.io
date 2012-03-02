var packageJSON = require('../package.json')
  , appVersion = 'v' + packageJSON.version.split('.').slice(0, -1).join('-')
  ;

module.exports = require('dis.covery')('disio-manager', appVersion);