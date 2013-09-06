var assert = require('assert');
var path   = require('path');
var fs     = require('fs');
var exec   = require('../exec');

module.exports = create;

var templatePath = path.normalize(path.join(__dirname, '../templates'));

function create(args, callback) {

  var calledback = false;
  function cb() {
    if (! calledback) {
      calledback = true;
      callback.apply(null, arguments);
    }
  }

  var template = args[0] || 'default';
  template = path.join(templatePath, template + '.json');
  var templateContent = fs.readFileSync(template, {encoding: 'utf8'});
  var uuid, ip;

  console.log('creating vm from %s', template);

  exec('vmadm create <<EOL\n' + templateContent + '\nEOL\n', onVmCreated);

  function onVmCreated(err, stdout, stderr) {
    if (err) cb(err);
    else {
      var match = stderr.trim().match(/^Successfully created VM (.*)$/);
      if (match) onUUID(match[1]);
      else cb(new Error(stderr));
    }
  }

  function onUUID(_uuid) {
    console.log('UUID:', _uuid);
    // get IP address
    uuid = _uuid;
    exec('zlogin ' + uuid + ' ipadm show-addr | grep net0', onShowAddr);
  }

  function onShowAddr(err, stdout, stderr) {
    if (err) cb (err);
    else {
      var cols = stdout.trim().split(' ');
      ip = cols[cols.length - 1];
      console.log('Address:', ip);
      cb(null, uuid, ip);
    }
  }

  function takeSnapshot() {
    exec('vmadm create-snapshot ' + uuid + ' clean', cb);
  }

}
