var exec = require('../exec');

module.exports = list;

function list(args, cb) {
  exec('vmadm list -p', onExec);

  function onExec(err, stdout, stderr) {
    if (err) cb(err);
    else if (stderr) cb(new Error(stderr));
    else {
      stdout = stdout.trim();
      if (stdout) cb(null, stdout.split('\n').map(handleLine));
      else cb(null, []);
    }
  }

  function handleLine(line) {
    var cols = line.split(':');
    return {
      uuid:  cols[0],
      type:  cols[1],
      ram:   cols[2],
      state: cols[3],
      alias: cols[4]
    };
  }
}
