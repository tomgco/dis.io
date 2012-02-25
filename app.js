var colors = require('colors')
  , mdns = require('mdns')
  , packageJSON = require('./package.json')
  , appVersion = packageJSON.version.replace(/\./gi, '-')
  ;

process.argv.forEach(function (val, index, array) {
  if (val === '--slave') {
    return console.log('Slave started'.green);
  } else if (val === '--master') {
    return;
  }

  if (index === array.length - 1) {
    console.log('');
  }
});
var txtRecord = {
    name: 'dis.io Manager'
  , master: true
};
var ad = mdns.createAdvertisement(mdns.udp('disio-manager', 'v' + appVersion), 1337, { 'txtRecord': txtRecord });
ad.start();