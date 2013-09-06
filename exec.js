var _exec = require('child_process').exec;

module.exports = exec;

function exec(cmd, cb) {
  findParentAddress(function(err, parent) {
    cmd = 'ssh ' + parent + ' ' + cmd;
    console.log(cmd);
    _exec(cmd, cb);
  });
}

function findParentAddress(cb) {
  _exec('mdata-get parent', function(err, stdout) {
    if (err) cb (err);
    else cb (null, stdout.trim());
  });
}
