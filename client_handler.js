var rpc    =  require('rpc-stream');
var server = require('./rpc_server');

module.exports = handler;

function handler(stream) {
  stream.setNoDelay(true);

  var s = rpc(server);
  s.once('error', error);
  s.pipe(stream).pipe(s);

  function error(err) {
    console.error(err.stack);
    stream.end();
  }

};