var http = require('http')
  , mdns = require('mdns')
  ;

exports.module.createManager = function() {
  var isMaster = false
    ;

  function checkForMaster(cb) {
    http.get({
        host: 'registry.dis.io'
      , port: 80
      , path: '/has/master'
    }, function(res) {
      console.log("Got response: " + res.statusCode);
      if (res.data && (res.statusCode === 200)) {
        isMaster = true;
      }
    }).on('error', function() {
      console.error('Registry not avalible');
    });
  }
};