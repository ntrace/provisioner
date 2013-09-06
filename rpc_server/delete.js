var exec = require('../exec');
var localExec = require('child_process').exec;

module.exports = create;

function create(args, cb) {

  var uuid = args[0];

	localExec('zonename', function(err, zonename) {
    if (err) cb (err);
    else if (zonename == uuid) cb(new Error('Cannot delete this zone'));
    else exec('vmadm delete ' + uuid, onExec);
  });

  function onExec(err, stdout, stderr) {
    if (err) cb(err);
    else {
      var match = stderr.trim().match(/^Successfully deleted VM (.*)$/);
      if (match) cb(null, match[1]);
      else cb(new Error(stderr));
    }
  }
}
