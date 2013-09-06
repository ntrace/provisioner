var server = require('./server');
var port   = 9180;

server.once('listening', function() {
  console.log('Provisioner server listening on port %d', port);
});

server.listen(port, '0.0.0.0');
