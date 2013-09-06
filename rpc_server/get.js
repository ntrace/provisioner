var exec = require('../exec');

module.exports = get;

function get(args, cb) {
  var uuid = args[0];

  exec('vmadm get ' + uuid, onExec);

  function onExec(err, stdout, stderr) {
    if (err) cb(err);
    else if (stderr) cb(new Error(stderr));
    else {
      var reply;
      try {
        reply = JSON.parse(stdout);
      } catch(err) {
        return cb(err);
      }
      cb(null, reply);
    }
  }
}
